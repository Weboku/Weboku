import React from "react";
import { motion } from "framer-motion";
import "./Contact.css";
import { useLocalContext } from "../../context/LocalContext";

const Contact = () => {
  const { webinfo } = useLocalContext();

  return (
    <section className="contact-section">
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Get in Touch</h1>
        <p>
          Have a project or question? Our team is always here to help you grow your business digitally.
        </p>
      </motion.div>

      <div className="contact-grid">
        <motion.div
          className="contact-box contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Reach Us</h2>
          <ul>
            <li><strong>Phone:</strong> <a href={`tel:${webinfo.phonecall}`}>{webinfo.phone}</a></li>
            <li><strong>Email:</strong> <a href={`mailto:${webinfo.email}`}>{webinfo.email}</a></li>
            <li><strong>Address:</strong> {webinfo.address || "Remote - India Based"}</li>
            <li><strong>Hours:</strong> Mon–Sat, 10AM–7PM</li>
          </ul>
        </motion.div>

        <motion.div
          className="contact-box contact-form"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="6" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </motion.div>
      </div>

      <motion.div
        className="contact-collab"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3>Want to Collaborate?</h3>
        <p>We love working with innovative brands and thinkers. Let's build the future together.</p>
        <p>Email us at <a href={`mailto:${webinfo.email}`}>{webinfo.email}</a></p>
      </motion.div>

      <div className="contact-map">
        <iframe
          title="Our Location"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609915975!2d72.74109703785945!3d19.082197839145994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a9d90e14b%3A0x838fe179b1bdc674!2s${encodeURIComponent(webinfo.addressCity || "India")}!5e0!3m2!1sen!2sin!4v1719999999999`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
