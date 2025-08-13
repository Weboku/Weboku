import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalContext } from '../../context/LocalContext';
import './Hero.css';
import {
  FaSearch, FaChartLine, FaFileAlt, FaBullhorn, FaRobot,
  FaClock, FaShoppingCart, FaEnvelopeOpenText, FaUsers,
  FaLightbulb, FaMobileAlt, FaFire,
  FaRocket
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { webinfo } = useLocalContext();

  const tabs = ['SEO', 'Advertising', 'Automation', 'Strategy', 'UI/UX'];
  const [activeTab, setActiveTab] = useState('SEO');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const tabContent = {
    SEO: [
      { title: '10 Keywords You Should Target', highlight: 'SEO', icon: <FaSearch /> },
      { title: 'Organic Traffic ↑', stat: '+145%', icon: <FaChartLine /> },
      { title: 'Technical Audit Score', stat: '92%', icon: <FaFileAlt /> },
      { title: 'Ranking Progress', highlight: 'Ranking', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989162/business_graph_grow_with_people_work_together-1-e1694333609769-removebg-preview_1_uinub5.png' },
      { title: 'Backlink Tracker', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989292/backlinking_f2cngd.jpg' },
      { title: 'Top 5 Pages by Visits', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989308/illustration-business-expansion_961875-381082_yldgdq.jpg', highlight: 'Traffic' },
    ],
    Advertising: [
      { title: 'Google Ads Audit', highlight: 'Google', icon: <FaBullhorn /> },
      { title: 'Meta ROI', stat: '3.5x', icon: <FaChartLine /> },
      { title: 'Budget Forecasting', stat: '$1.2K/month', icon: <FaFileAlt /> },
      { title: 'Ad Copy Ideas', highlight: 'Engaging Texts', icon: <FaEnvelopeOpenText /> },
      { title: 'Visual Ad Sample', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989341/ad_dyg6cf.png' },
      { title: 'Top Converting Ad', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989373/web-ads-4468605-3871533_rrdo8l.png' },
    ],
    Automation: [
      { title: 'Lead Nurture Series', highlight: 'Emails', icon: <FaEnvelopeOpenText /> },
      { title: 'Avg. Response Time', stat: '2.1s', icon: <FaClock /> },
      { title: 'Abandoned Cart Flow', highlight: 'eComm', icon: <FaShoppingCart /> },
      { title: 'Auto Follow-Ups', stat: '+27% replies', icon: <FaRobot /> },
      { title: 'CRM Workflow', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989394/crm-system-illustration-download-in-svg-png-gif-file-formats--business-growth-customer-relationship-management-development-and-finance-4-pack-people-illustrations-3811737_jrl8gy.png' },
      { title: 'Bot Interactions', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989417/ai-chat-conversation-human-with-robot-illustration-concept-chat-bot-interaction-artificial-intelligence-language-model-processing-flat-design-vector_ohkn09.jpg' },
    ],
    Strategy: [
      { title: 'Quarterly Roadmap', highlight: 'Plan', icon: <FaFileAlt /> },
      { title: 'Top Goals', stat: 'CTR +28%', icon: <FaChartLine /> },
      { title: 'Content Funnel', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989440/digital-marketing-related-vector-illustration-flat-modern-design_1155284-2342_muzusl.jpg' },
      { title: 'Competitor Benchmark', highlight: 'Market Intel', icon: <FaUsers /> },
      { title: 'User Persona Deck', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989482/d1b77c162320843.63d3a39deec49_ubjrva.png' },
      { title: 'Brand Positioning', stat: '84% Consistency', icon: <FaLightbulb /> },
    ],
    'UI/UX': [
      { title: 'Landing Page Audit', highlight: 'UX', icon: <FaFileAlt /> },
      { title: 'Figma Draft', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989500/figma_exodt8.svg' },
      { title: 'Conversion Uplift', stat: '+42%', icon: <FaChartLine /> },
      { title: 'Mobile Optimization', stat: 'A+', icon: <FaMobileAlt /> },
      { title: 'Before/After Design', image: 'https://res.cloudinary.com/dqdngisww/image/upload/v1754989519/1000_F_632336622_Mofck7D4v9sU8sEbFbWaMRqUI8jCay6m_nwcxcg.jpg' },
      { title: 'Heatmap Insights', highlight: 'User Flow', icon: <FaFire /> },
    ],
  };

  const boxWidths = {
    SEO: ['160px', '240px', '120px', '160px', '200px', '160px'],
    Advertising: ['160px', '160px', '180px', '150px', '190px', '160px'],
    Automation: ['160px', '160px', '180px', '160px', '200px', '180px'],
    Strategy: ['150px', '160px', '190px', '160px', '180px', '140px'],
    'UI/UX': ['160px', '180px', '180px', '160px', '190px', '160px'],
  };

  const leftParentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
};

const gridParentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
};

const navigate = useNavigate();

const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1280);

useEffect(() => {
  const onResize = () => setIsDesktop(window.innerWidth >= 1280);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);


  return (
    <section className="hero-section kap-hero">
      {/* LEFT */}
<motion.div
  className="kap-hero-left"
  variants={leftParentVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div className="kap-badge" variants={fadeSlideUp}>
    <FaBullhorn style={{ marginRight: '0.6rem' }} /> Digital Marketing Experts
  </motion.div>

  <motion.h1 className="kap-main-title" variants={fadeSlideUp}>
    <span className="highlight-text">{webinfo?.name || 'Weboku'}</span> builds brands that grow.
  </motion.h1>

  <motion.p className="kap-description" variants={fadeSlideUp}>
    From strategy to execution, we help startups and enterprises attract traffic, drive conversions, and scale results.
    Trusted by 100+ global brands.
  </motion.p>

  <motion.div className="kap-cta-buttons" variants={fadeSlideUp}>
    <button className="primary-cta" onClick={()=>navigate('/contact')}>
      <FaRocket style={{ marginRight: '0.6rem', marginBottom: '-0.2rem' }} />
      Start Your Campaign
    </button>
    <button className="secondary-cta" onClick={()=>navigate('/services')}>
      <FaFileAlt style={{ marginRight: '0.6rem', marginBottom: '-0.2rem' }} />
      View Services
    </button>
  </motion.div>

  <motion.div className="kap-trust-stats" variants={fadeSlideUp}>
    <span>
      <FaUsers style={{ marginRight: '0.4rem', marginBottom: '-0.2rem' }} />
      4.9/5 Rated by 100+ Clients
    </span>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <span>
      <FaChartLine style={{ margin: '0 0.4rem', marginBottom: '-0.2rem' }} />
      $3M+ Ad Budget Optimized
    </span>
  </motion.div>

  <motion.div className="kap-review-logos" variants={fadeSlideUp}>
    <img src="https://res.cloudinary.com/dqdngisww/image/upload/v1754989055/OIP_em6kb3.webp" alt="Google Reviews" />
    <img src="https://res.cloudinary.com/dqdngisww/image/upload/v1754989071/clutch-reviews-1_ogj2br.png" alt="Clutch Reviews" />
    <img src="https://res.cloudinary.com/dqdngisww/image/upload/v1754989087/111_zv1cvi.jpg" alt="Trustpilot Reviews" />
  </motion.div>

  <motion.div className="kap-client-logos-hint" variants={fadeSlideUp}>
    <p>You're in good company — loved by startups & global enterprises</p>
  </motion.div>
</motion.div>




      {/* RIGHT */}
      <motion.div className="kap-tabbed-widget" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="kap-tab-nav">
          {tabs.map((tab) => (
            <button key={tab} className={tab === activeTab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    className="kap-widget-grid"
    variants={gridParentVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
  >
    {tabContent[activeTab].map((item, index) => (
      <motion.div
        variants={cardVariants}
        className={`kap-widget-card card-${index}`}
        key={index}
      style={ isDesktop ? { width: boxWidths[activeTab][index] || '160px' } : undefined }
      >
        {item.image ? (
          <img src={item.image} alt={item.title} className="kap-card-img" />
        ) : (
          <div className="kap-card-icon">{item.icon}</div>
        )}
        <div className="kap-card-content">
          {item.highlight && <span className="kap-card-highlight">{item.highlight}</span>}
          {item.stat && <span className="kap-card-stat">{item.stat}</span>}
          {item.title && <p className="kap-card-title">{item.title}</p>}
        </div>
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>

      </motion.div>
    </section>
  );
};

export default Hero;
