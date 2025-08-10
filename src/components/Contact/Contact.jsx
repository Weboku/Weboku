// Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
  faPaperPlane,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import "./Contact.css";
import { useLocalContext } from "../../context/LocalContext";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }
};

const Contact = () => {
  const { webinfo = {} } = useLocalContext();

  const phoneHref = webinfo.phonecall || webinfo.phone || "";
  const email = webinfo.email || "";
  const city = webinfo.addressCity || "India";

  return (
    <section className="contact-section">
      {/* Hero */}
      <motion.div
        className="contact-hero"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="hero-badge">
          <FontAwesomeIcon icon={faPaperPlane} />
          <span>We reply within 24 hours</span>
        </span>
        <h1>Let’s talk about your next project</h1>
        <p>
          Have a question, idea, or brief? We’re here to help you grow with thoughtful design & tech.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="contact-grid">
        {/* Info */}
        <motion.div className="contact-card contact-info" {...fadeUp} transition={{ duration: 0.5 }}>
          <h2>Reach us</h2>

          <ul className="info-list">
            <li>
              <span className="icon-circle">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <div>
                <strong>Phone</strong>
                <a href={`tel:${phoneHref}`}>{webinfo.phone || "—"}</a>
              </div>
            </li>

            <li>
              <span className="icon-circle">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${email}`}>{email || "—"}</a>
              </div>
            </li>

            <li>
              <span className="icon-circle">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              <div>
                <strong>Address</strong>
                <span>{webinfo.address || "Remote • India based"}</span>
              </div>
            </li>

            <li>
              <span className="icon-circle">
                <FontAwesomeIcon icon={faClock} />
              </span>
              <div>
                <strong>Hours</strong>
                <span>Mon–Sat, 10:00–19:00 IST</span>
              </div>
            </li>
          </ul>

          <div className="quick-actions">
            {phoneHref && (
              <a className="btn solid" href={`tel:${phoneHref}`}>
                <FontAwesomeIcon icon={faPhone} />
                Call now
              </a>
            )}
            {email && (
              <a className="btn outline" href={`mailto:${email}`}>
                <FontAwesomeIcon icon={faEnvelope} />
                Email us
              </a>
            )}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div className="contact-card contact-form" {...fadeUp} transition={{ duration: 0.6, delay: 0.05 }}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Your Name</label>
                <input id="name" type="text" placeholder="Jane Doe" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="jane@company.com" required />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" placeholder="Project, question, or idea" />
            </div>

            <div className="form-field">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" rows="6" placeholder="Tell us a bit about what you need…" required />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn solid">
                <FontAwesomeIcon icon={faPaperPlane} />
                Send message
              </button>
              <span className="form-note">
                We’ll get back within one business day.
              </span>
            </div>
          </form>
        </motion.div>
      </div>

      {/* CTA band */}
      <motion.div className="contact-cta" {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }}>
        <h3>Prefer email?</h3>
        <p>
          Drop us a line at{" "}
          <a href={`mailto:${email}`}>
            {email} <FontAwesomeIcon icon={faArrowRight} />
          </a>{" "}
          and we’ll respond shortly.
        </p>
      </motion.div>

      {/* Map */}
      <motion.div className="contact-map" {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
        <iframe
          title="Our location"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609915975!2d72.74109703785945!3d19.082197839145994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a9d90e14b%3A0x838fe179b1bdc674!2s${encodeURIComponent(
            city
          )}!5e0!3m2!1sen!2sin!4v1719999999999`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </motion.div>
    </section>
  );
};

export default Contact;
