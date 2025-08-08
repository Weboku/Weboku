// ...keep your imports
import React, { useEffect, useState } from "react";
import "./TechStack.css";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const tools = [
  { name: "Google Ads", img: "https://res.cloudinary.com/dlcgjnkvv/image/upload/v1750426823/Digital%20Marketting/Tech%20Stack/google-ads_sqagqu.svg" },
  { name: "Meta Ads",   img: "https://res.cloudinary.com/dlcgjnkvv/image/upload/v1750426831/Digital%20Marketting/Tech%20Stack/6033716_o4df5g.png" },
  { name: "SEMrush",    img: "https://res.cloudinary.com/dlcgjnkvv/image/upload/v1750426838/Digital%20Marketting/Tech%20Stack/semrush-icon_jvv8k3.png" },
  { name: "Ahrefs",     img: "https://res.cloudinary.com/dlcgjnkvv/image/upload/v1750426845/Digital%20Marketting/Tech%20Stack/primary-light-AK6KQQMG_ws6k2g.png" },
  { name: "GA4",        img: "https://res.cloudinary.com/dlcgjnkvv/image/upload/v1750426853/Digital%20Marketting/Tech%20Stack/google-analytics-4_q1goki.svg" },
  { name: "WordPress",  img: "https://res.cloudinary.com/dlcgjnkvv/image/upload/v1750426862/Digital%20Marketting/Tech%20Stack/174881_h0yxei.png" },
];

const TechStack = () => {
  const [active, setActive] = useState(0);

  // auto-advance
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % tools.length), 3000);
    return () => clearInterval(t);
  }, []);

  // relative offset from active (-N..N)
  const offsetFromActive = (i) => {
    let d = i - active;
    const half = Math.floor(tools.length / 2);
    if (d > half) d -= tools.length;
    if (d < -half) d += tools.length;
    return d; // -3..3 depending on length
    };

  return (
    <section className="subscribe-band">
      {/* center-mode carousel */}
      <div className="brand-carousel-center">
        {tools.map((t, i) => {
          const off = offsetFromActive(i);
          // map offset to position / scale / opacity
          const x = off * 180;              // spacing between items
          const scale = off === 0 ? 1 : off === -1 || off === 1 ? 0.85 : 0.72;
          const opacity = off === 0 ? 1 : off === -1 || off === 1 ? 0.8 : 0.45;
          const z = 100 - Math.abs(off);    // keep center on top

          return (
            <motion.button
              key={i}
              className={`brand-pill center-pill ${off === 0 ? "is-active" : ""}`}
              style={{ zIndex: z }}
              title={t.name}
              onClick={() => setActive(i)}
              initial={false}
              animate={{ x, scale, opacity }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <img src={t.img} alt={t.name} loading="lazy" />
            </motion.button>
          );
        })}
      </div>

      {/* subscribe card – unchanged */}
      <motion.div
        className="subscribe-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <p className="sub-eyebrow">Subscribe</p>
        <h3>Subscribe to get information, latest news and other interesting offers.</h3>

        <form
          className="subscribe-form"
          onSubmit={(e) => {
            e.preventDefault();
            // handle submit
          }}
        >
          <input type="email" placeholder="Your email" required />
          <button type="submit">Subscribe</button>
        </form>

        <button className="float-plane" aria-label="Subscribe">
          <FaPaperPlane />
        </button>
      </motion.div>
    </section>
  );
};

export default TechStack;
