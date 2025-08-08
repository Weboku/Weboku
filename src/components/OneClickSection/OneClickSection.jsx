import React, { forwardRef } from 'react';
import './OneClickSection.css';
import { FaBullhorn, FaUserTie, FaArrowRight, FaRegClock, FaAd } from 'react-icons/fa';
import { MdOutlineAutoGraph, MdInsights } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const containerVariant = {
  initial: {},
  animate: { transition: { staggerChildren: 0.2 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const OneClickSection = forwardRef((props, ref) => {

  const navigate = useNavigate();

  return (
    <section className="one-click" ref={ref}>
      <motion.div
        className="one-click__grid-multi"
        variants={containerVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Feature Card: Meta + Google Ads */}
        <motion.div className="card-wide feature-block" variants={cardVariant}>
          <div className="feature-icon">
            <FaAd />
          </div>
          <h3>Meta & Google Ad Campaigns</h3>
          <p>
            Run performance-focused ad campaigns across Meta & Google platforms — with complete setup,
            creatives, targeting, and optimization.
          </p>
          <button className="card-btn" onClick={()=>navigate('/services/ads')}>
            Learn More <FaArrowRight />
          </button>
        </motion.div>

        {/* Stat: Clicks */}
        <motion.div className="card-tall stat-highlight" variants={cardVariant}>
          <h4>32K+ Monthly Clicks</h4>
          <p>Across Search, Display, Reels, and YouTube — with 2.6x CTR growth in key markets.</p>
          <div className="stat-icon">
            <MdOutlineAutoGraph />
          </div>
        </motion.div>

        {/* Small Card: Trust */}
        <motion.div className="card-small trust-block" variants={cardVariant}>
          <h5>4.7★ Client Satisfaction</h5>
          <p>Rated across 200+ brands for campaign performance & transparency.</p>
          <img
            src="https://res.cloudinary.com/dqg8b5o90/image/upload/v1753673287/Weboku/business_graph_grow_with_people_work_together-1-e1694333609769-removebg-preview_1.png"
            alt="Client Feedback"
            className="trust-image"
          />
        </motion.div>

        {/* Clients Served */}
        <motion.div className="card-wide client-card" variants={cardVariant}>
          <div className="client-stats">
            <FaUserTie className="client-icon" />
            <div>
              <h4>120+ Active Clients</h4>
              <p>across eCommerce, Real Estate, Healthcare & EdTech</p>
            </div>
          </div>
          <div className="contract-bar">
            <span style={{ width: '90%' }} />
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div className="card-tall ai-card" variants={cardVariant}>
          <h4>AI-Based Ad Optimization</h4>
          <p>Automated bid adjustments, creative split testing, and predictive audience suggestions.</p>
          <div className="stat-icon">
            <MdInsights />
          </div>
        </motion.div>

        {/* Optimization */}
        <motion.div className="card-small optimization-card" variants={cardVariant}>
          <h5>Live Performance Tuning</h5>
          <p>Adjusting ad sets, audiences, and budgets based on real-time metrics and ROAS.</p>
          <FaRegClock style={{ fontSize: '1.8rem', marginTop: '1rem', color: '#1e40af' }} />
        </motion.div>
      </motion.div>
    </section>
  );
});

export default OneClickSection;
