import React from 'react';
import './Terms.css';
import { useLocalContext } from '../../context/LocalContext';

const Terms = () => {
  const { webinfo } = useLocalContext();

  return (
    <div className="privacy-policy">
      <div className="privacy-policy-header">
        <h2>Terms & Conditions</h2>
      </div>
      <div className="privacy-policy-content">

        <h3>1. Introduction</h3>
        <p>
          Welcome to <strong>{webinfo.name}</strong>. These Terms & Conditions govern your access to and use of our services and website. By engaging with us, you agree to abide by the following conditions and any additional policies referenced herein.
        </p>

        <h3>2. Scope of Services</h3>
        <p>
          We offer strategic consulting, branding, digital marketing, web development, and automation services. Each engagement will be governed by its respective proposal, agreement, or service-level scope document.
        </p>

        <h3>3. Client Responsibilities</h3>
        <p>
          Clients must provide accurate information, timely approvals, and access to necessary platforms or resources. Project timelines may be affected by delayed inputs or communication gaps.
        </p>

        <h3>4. Payments & Billing</h3>
        <p>
          Payments are due as per the invoicing terms outlined in your agreement. Late payments may incur interest and lead to service pauses until dues are cleared in full. All pricing is exclusive of applicable taxes unless stated otherwise.
        </p>

        <h3>5. Intellectual Property</h3>
        <p>
          Final deliverables become the client’s property after complete payment. However, <strong>{webinfo.name}</strong> retains the right to showcase non-confidential work in portfolios or case studies unless explicitly restricted in writing.
        </p>

        <h3>6. Confidentiality</h3>
        <p>
          We maintain strict confidentiality for all proprietary information shared during a project. We will not disclose or misuse client data without prior consent except where required by law.
        </p>

        <h3>7. Performance Disclaimer</h3>
        <p>
          While we apply best practices and data-backed strategies, we do not guarantee specific results such as keyword rankings, traffic, or revenue. Client-side platform performance and external factors may influence outcomes.
        </p>

        <h3>8. Termination Policy</h3>
        <p>
          Engagements may be terminated by either party with written notice. Fees for completed work and active deliverables must be settled. We reserve the right to discontinue service due to misuse, breach, or non-payment.
        </p>

        <h3>9. Liability Limitations</h3>
        <p>
          Our liability is limited to the total fees paid for the specific service. We are not responsible for indirect losses, business interruptions, or third-party platform issues.
        </p>

        <h3>10. Governing Law</h3>
        <p>
          These terms are governed by the laws of India. Any legal proceedings shall be subject to jurisdiction in the courts of {webinfo.addressCity || 'your operating region'}.
        </p>

        <h3>11. Amendments</h3>
        <p>
          We may update these Terms from time to time. Clients will be notified of major changes, and continued use of services will constitute acceptance of the revised terms.
        </p>

        <h3>12. Contact Us</h3>
        <p>
          For any questions regarding these Terms & Conditions, please contact us at <strong>{webinfo.email}</strong> or call <strong>{webinfo.phone}</strong>.
        </p>

      </div>
    </div>
  );
};

export default Terms;
