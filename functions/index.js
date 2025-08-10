const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

/**
 * Callable: createAdminUser
 * data: { email, name, role, tempPassword }
 * Only callable by a MASTER (role === 'master')
 */
exports.createAdminUser = functions.https.onCall(async (data, context) => {
  // 1) Auth required
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
  }

  // 2) Check caller role (must be master) by reading /admin/{callerUid}
  const callerUid = context.auth.uid;
  const callerSnap = await db.collection('admin').doc(callerUid).get();
  const callerRole = callerSnap.exists ? callerSnap.data().role : null;
  if (callerRole !== 'master') {
    throw new functions.https.HttpsError('permission-denied', 'Only master can create admins.');
  }

  // 3) Validate input
  const { email, name, role, tempPassword } = data || {};
  if (!email || !role) {
    throw new functions.https.HttpsError('invalid-argument', 'email and role are required.');
  }

  // 4) Create Auth user with temporary password
  let userRecord;
  try {
    userRecord = await admin.auth().createUser({
      email,
      password: tempPassword || Math.random().toString(36).slice(-12),
      displayName: name || '',
      emailVerified: false,
      disabled: false,
    });
  } catch (e) {
    if (e.code === 'auth/email-already-exists') {
      throw new functions.https.HttpsError('already-exists', 'Email already in use.');
    }
    throw new functions.https.HttpsError('internal', e.message);
  }

  const uid = userRecord.uid;

  // 5) (Optional) custom claims if you plan to use them in rules
  // await admin.auth().setCustomUserClaims(uid, { role });

  // 6) Write Firestore doc /admin/{uid}
  const payload = {
    email,
    name: name || '',
    role,                       // 'master' | 'all' | 'editor' | 'viewer'
    status: 'active',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  await db.collection('admin').doc(uid).set(payload, { merge: true });

  // 7) Send password reset link (recommended)
  // New admin will immediately set a new password from this link.
  try {
    const resetLink = await admin.auth().generatePasswordResetLink(email);
    return { uid, email, resetLink };
  } catch (e) {
    // If it fails, still return uid
    return { uid, email };
  }
});
