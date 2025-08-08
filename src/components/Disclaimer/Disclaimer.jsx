import React from 'react';
import './Disclaimer.css';
import { useLocalContext } from '../../context/LocalContext';

const Disclaimer = () => {
  const { webinfo } = useLocalContext();

  return (
    <div className="privacy-policy">
      <div className="privacy-policy-header">
        <h2>Website Disclaimer</h2>
      </div>
      <div className="privacy-policy-content">

        <h3>1. General Information</h3>
        <p>
          The information contained on this website is for general information purposes only. While <strong>{webinfo.name}</strong> strives to ensure the accuracy and completeness of the content, we make no representations or warranties of any kind, express or implied, about the reliability, suitability, or availability with respect to the website or the information provided.
        </p>

        <h3>2. No Professional Advice</h3>
        <p>
          All content provided on this site is for informational purposes only and should not be interpreted as professional, legal, financial, or technical advice. You should consult appropriate professionals before making any decisions based on information obtained from this website.
        </p>

        <h3>3. External Links</h3>
        <p>
          This website may contain links to external websites that are not provided or maintained by <strong>{webinfo.name}</strong>. We do not guarantee the accuracy, relevance, or timeliness of any information on these third-party sites and are not responsible for their content, security, or practices.
        </p>

        <h3>4. Limitation of Liability</h3>
        <p>
          Under no circumstances shall <strong>{webinfo.name}</strong> be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with your use of this website or reliance on any information provided, even if we have been advised of the possibility of such damages.
        </p>

        <h3>5. Errors and Omissions</h3>
        <p>
          While we attempt to keep all information current and accurate, there may be errors, omissions, or outdated content. <strong>{webinfo.name}</strong> reserves the right to modify or remove content without prior notice.
        </p>

        <h3>6. Terms Subject to Change</h3>
        <p>
          This disclaimer may be updated periodically without notice. Your continued use of the site after changes are posted constitutes your acceptance of the revised disclaimer.
        </p>

        <h3>7. Contact Us</h3>
        <p>
          If you have any questions or concerns regarding this disclaimer, you may contact us at <strong>{webinfo.email}</strong> or call us at <strong>{webinfo.phone}</strong>.
        </p>

      </div>
    </div>
  );
};

export default Disclaimer;
