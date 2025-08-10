import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faUsers,
  faGlobe,
  faCheckCircle,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faLinkedinIn, // ✅ valid here
} from "@fortawesome/free-brands-svg-icons";

import { useLocalContext } from "../../context/LocalContext";

const Footer = () => {
  const { webinfo } = useLocalContext();

  return (
    <footer className="footer-multi">
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-brand-subscribe">
          <h2>{webinfo.name}</h2>
          <p>Smart digital marketing for modern businesses. Join the {webinfo.name} family!</p>
          <div className="footer-subscribe">
            <input type="email" placeholder="Enter your email" />
            <button><FontAwesomeIcon icon={faPaperPlane} /></button>
          </div>
          <div className="footer-socials">
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <h4>About {webinfo.name}</h4>
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/testimonials">Testimonials</a></li>
               <li><a href="/Blogs">Blogs</a></li>
              {/* <li><a href="/press">Press</a></li> */}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><a href="/services/seo">SEO Services</a></li>
              <li><a href="/services/ads">Ad Services</a></li>
              <li><a href="/services/digital">Digital Marketing</a></li>
              <li><a href="/services/email-marketing">Email Marketing</a></li>
              <li><a href="/services/analytics">Analytics</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/strategies">Our Strategies</a></li>
              <li><a href="/terms-and-condition">Terms</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Tools</h4>
            <ul>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/reports">Reports</a></li>
              <li><a href="/consultation">Get Consultation</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Middle Value Section */}
      <div className="footer-middle">
        <div className="footer-value">
          <FontAwesomeIcon icon={faLeaf} className="footer-icon" />
          <div>
            <h5>100% Strategic</h5>
            <p>Everything we do is goal-driven and designed to generate results for your business.</p>
          </div>
        </div>
        <div className="footer-value">
          <FontAwesomeIcon icon={faUsers} className="footer-icon" />
          <div>
            <h5>Pro Team</h5>
            <p>Top-tier experts across SEO, ads, design, and analytics — working together for your growth.</p>
          </div>
        </div>
        <div className="footer-value">
          <FontAwesomeIcon icon={faGlobe} className="footer-icon" />
          <div>
            <h5>Global Clients</h5>
            <p>Trusted by clients across 20+ countries — we understand both local and global markets.</p>
          </div>
        </div>
        <div className="footer-value">
          <FontAwesomeIcon icon={faCheckCircle} className="footer-icon" />
          <div>
            <h5>Results-Backed</h5>
            <p>Everything we promise is measurable — and we deliver growth you can see in real numbers.</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {webinfo.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
