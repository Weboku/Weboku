import React from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();

  return (
   <section className="elevate-banner">
  <motion.div className="elevate-banner-content"   initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}   transition={{ delay: 0.25, duration: 0.5 }}>
    <h2>Fuel Your Growth with Purposeful Marketing</h2>
    <p>
      From data-backed strategies to creative storytelling, we craft digital
      experiences that turn visitors into loyal customers. Let’s launch
      campaigns that elevate your brand.
    </p>
    <button onClick={()=>navigate('/contact')}>Get Your Free Growth Plan</button>
  </motion.div>
</section>

  );
};

export default Banner;
