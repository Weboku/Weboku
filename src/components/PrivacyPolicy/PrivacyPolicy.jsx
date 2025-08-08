import React from 'react';
import './PrivacyPolicy.css';
import { useLocalContext } from '../../context/LocalContext';

const PrivacyPolicy = () => {
  const { webinfo } = useLocalContext();

  return (
    <div className="privacy-policy">
      <div className="privacy-policy-header">
        <h2>Privacy Policy</h2>
      </div>
      <div className="privacy-policy-content">

        <h3>1. Introduction</h3>
        <p>
          At <strong>{webinfo.name}</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you engage with our website or services.
        </p>

        <h3>2. Information We Collect</h3>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Data</strong>: Name, email, phone number, and communication details.</li>
          <li><strong>Website Usage</strong>: IP address, browser type, referral pages, and interaction patterns.</li>
          <li><strong>Transactional Data</strong>: Billing details and purchase history (processed via secure third-party platforms).</li>
        </ul>

        <h3>3. Purpose of Data Collection</h3>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and improve our services.</li>
          <li>Respond to inquiries and support requests.</li>
          <li>Send updates, offers, or newsletters with your consent.</li>
          <li>Ensure platform security and troubleshoot technical issues.</li>
        </ul>

        <h3>4. Use of Cookies</h3>
        <p>
          Our site uses cookies to analyze traffic, enhance user experience, and personalize content. You can manage cookie preferences through your browser settings.
        </p>

        <h3>5. Data Storage & Security</h3>
        <p>
          We implement advanced security measures including HTTPS encryption, limited access controls, and third-party security audits to protect your data. However, no method is completely secure, and you use our services at your own risk.
        </p>

        <h3>6. Your Rights</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Object to or restrict processing under certain circumstances.</li>
          <li>Withdraw consent for marketing communications at any time.</li>
        </ul>

        <h3>7. Third-Party Sharing</h3>
        <p>
          We never sell your personal information. We may share it with vetted service providers (like payment gateways or CRM platforms) strictly for the purpose of service delivery, under confidentiality agreements.
        </p>

        <h3>8. International Transfers</h3>
        <p>
          If we transfer your data internationally (e.g., to cloud servers), we ensure adequate safeguards are in place as per global data protection laws.
        </p>

        <h3>9. Children’s Privacy</h3>
        <p>
          Our services are not directed toward individuals under 16. We do not knowingly collect data from minors. If you believe a child has submitted information to us, please contact us immediately.
        </p>

        <h3>10. Updates to This Policy</h3>
        <p>
          We may revise this policy to reflect regulatory changes or service updates. The current version will always be available on this page, with the latest effective date.
        </p>

        <h3>11. Contact Us</h3>
        <p>
          If you have questions about our privacy practices, please email us at <a href={`mailto:${webinfo.email}`}>{webinfo.email}</a> or call <strong>{webinfo.phone}</strong>.
        </p>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
