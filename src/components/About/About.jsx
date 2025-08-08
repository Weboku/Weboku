import React, { useState } from "react";
import "./About.css";
import {
  FaBolt,
  FaChartLine,
  FaHandshake,
   FaBriefcase, FaRedoAlt, FaBullhorn, FaEye ,
   FaCogs,
   FaBullseye,
   FaLightbulb,
   FaLaptopCode,
   FaClock,
   FaUsers
} from "react-icons/fa";
import { } from 'react-icons/fa';
import { useLocalContext } from "../../context/LocalContext";
import { motion } from "framer-motion";
import WhyChooseSection from "../WhyChooseSection/WhyChooseSection";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const About = () => {
  const [tab, setTab] = useState("mission");
  const { webinfo } = useLocalContext();

  const renderTabContent = () => {
    switch (tab) {
      case "mission":
        return (
          "Our mission is to deliver performance-driven digital marketing that helps businesses grow smarter and faster. " +
          "We combine data analytics, creative storytelling, and strategic planning to craft campaigns that not only look good " +
          "but perform exceptionally. From startups to enterprises, we empower brands to engage their audience, generate leads, " +
          "and maximize ROI through modern, scalable solutions across SEO, paid ads, social media, and content marketing."
        );
      case "vision":
        return (
          "We envision a future where brands of all sizes can harness the full power of digital to thrive and lead their industry. " +
          "Our vision is to democratize marketing innovation — making advanced strategies accessible, measurable, and impactful for every business. " +
          "We’re committed to being a long-term partner for growth by anticipating trends, adapting quickly, and delivering marketing solutions that stand the test of time."
        );
      case "values":
        return (
          "We stand by transparency, creativity, innovation, and delivering measurable results that matter. " +
          "Every strategy we develop is rooted in trust and collaboration. We believe in being data-informed yet customer-centric, " +
          "ensuring that performance never comes at the cost of brand authenticity. Our team values continuous learning, ethical practices, " +
          "and going above and beyond to help our clients succeed in the ever-evolving digital space."
        );
      default:
        return "";
    }
  };

  return (
    <section className="about-page">

      {/* Welcome Section */}
      <motion.div className="welcome-wrapper" initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay:  0.2, duration: 0.6 }}>
        <div className="welcome-content">
          <h1>
            <span className="welcome-outline">
              Welcome To <span className="welcome-solid">{webinfo.name}</span>
            </span>
          </h1>
          <h2>WE TRANSFORM BRANDS INTO DIGITAL POWERHOUSES</h2>
          <p>
            In today’s fast-paced digital world, visibility is everything. At {webinfo.name}, we help businesses cut through the noise and stand out online.
            Our team of passionate marketers, strategists, and creatives work together to craft campaigns that drive real results.
            From SEO and paid ads to content marketing and brand strategy — we’re here to make digital growth simple, effective, and scalable.
            Let’s turn your online presence into your greatest business asset.
          </p>
          <motion.div className="kap-review-logos" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <img src="https://tse2.mm.bing.net/th/id/OIP.TcdrrPoaI1Qa3XMrit7dUwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Google Reviews" />
            <img src="https://sunshinedesign.com.au/wp-content/uploads/2021/10/clutch-reviews-1.png" alt="Clutch Reviews" />
            <img src="https://www.besdamsoup.com/static/sitefiles/testimonials/111.jpg" alt="Trustpilot Reviews" />
          </motion.div>
        </div>

        <div className="welcome-img">
          <img src="https://artdigitalmedia.co.uk/wp-content/uploads/2023/10/%E2%80%94Pngtree%E2%80%94happy-business-people-celebrating-success_7516356-1024x1024.png" alt="" />
        </div>
      </motion.div>

      {/* Tabs Section */}
      <motion.div className="about-tabs" >
        <div className="tabs-text">
          <p className="label">How It Started</p>
          <h2>Our Journey in Digital</h2>
          <div className="tabs-btns">
            <button className={tab === "mission" ? "active" : ""} onClick={() => setTab("mission")} initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay:  0.2, duration: 0.6 }}>Mission</button>
            <button className={tab === "vision" ? "active" : ""} onClick={() => setTab("vision")} initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay:  0.4, duration: 0.6 }}>Vision</button>
            <button className={tab === "values" ? "active" : ""} onClick={() => setTab("values")} initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay:  0.6, duration: 0.6 }}>Values</button>
          </div>
          <p className="tab-desc">{renderTabContent()}</p>
        </div>
        <div className="tabs-image">
          <img src="https://img.freepik.com/premium-vector/vector-organic-flat-people-business-training-illustration-flat-illustration_787500-5793.jpg?w=2000" alt="tab" />
        </div>
      </motion.div>

      {/* Banner */}
      <motion.div className="about-banner" initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay:  0.2, duration: 0.6 }}>
        <img src="https://img.freepik.com/premium-photo/person-enjoying-virtual-teambuilding-activity_1029473-399110.jpg" alt="Team" />
      </motion.div>

      {/* Core Pillars */}
 <motion.section
  className="about-pillars-hex"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.6 }}
>
  <p className="pillars-subtitle">Our Strength</p>
  <h2 className="pillars-title">Our Core Pillars</h2>
  <p className="pillars-intro">
    At the heart of our digital marketing philosophy are the core principles that drive everything we do.
    From strategic planning to fast-paced execution, we blend creativity, data, and technology to deliver growth.
  </p>

  <div className="pillars-hex-grid">
    {[
      {
        icon: <FaBolt />,
        title: "Performance",
        desc: "We focus on delivering measurable results — more leads, more traffic, more ROI.",
        color: "#3b82f6",
      },
      {
        icon: <FaChartLine />,
        title: "Strategy",
        desc: "Every decision is backed by insight and tailored around your goals and market.",
        color: "#8b5cf6",
      },
      {
        icon: <FaHandshake />,
        title: "Partnership",
        desc: "We believe in collaboration and long-term success, not one-time transactions.",
        color: "#06b6d4",
      },
      {
        icon: <FaBullseye />,
        title: "Precision",
        desc: "We don’t guess. We A/B test, track KPIs, and optimize every click and scroll.",
        color: "#f97316",
      },
      {
        icon: <FaCogs />,
        title: "Execution",
        desc: "With agile processes and automation, we bring your marketing vision to life—fast.",
        color: "#10b981",
      },
      {
        icon: <FaLaptopCode />,
        title: "Technology-Driven",
        desc: "We embrace modern tools and AI to scale your digital presence and automate workflows.",
        color: "#0ea5e9",
      },
      {
        icon: <FaLightbulb />,
        title: "Creative Thinking",
        desc: "We blend data with creativity to build campaigns that stand out and convert.",
        color: "#eab308",
      },
      {
  icon: <FaUsers />,
  title: "Customer-Centric Approach",
  desc: "Every strategy starts with understanding your audience and putting their needs first.",
  color: "#f43f5e",
},

    ].map((item, index) => (
      <motion.div className="pillar-hex-card" key={index} whileHover={{ scale: 1.05 }}>
        <div
          className="pillar-hex-icon"
          style={{ backgroundColor: item.color }}
        >
          {item.icon}
        </div>
        <h4>{item.title}</h4>
        <p>{item.desc}</p>
      </motion.div>
    ))}
  </div>
</motion.section>


      {/* Why Choose Us */}
     <WhyChooseSection />


      {/* Stats */}
 
<motion.section
  className="about-stats-section"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.6 }}
>
  <div className="about-stats-container">
    {/* LEFT TEXT BLOCK */}
    <div className="stats-intro">
      <h2>Proven Results, Real Impact</h2>
      <p>
        We've worked with 100+ brands to build scalable, data-driven ad campaigns
        that don’t just bring clicks — they deliver business growth. Our
        performance stats speak for themselves.
      </p>
    </div>

    {/* RIGHT STATS GRID */}
    <div className="stats-grid">
      <div className="stat-block">
        <div className="stat-icon-circle" style={{ backgroundColor: "#3b82f6" }}>
          <FaBriefcase />
        </div>
        <h3>8+</h3>
        <p className="stat-label">Years in Business</p>
        <span className="stat-desc">
          From startups to enterprises, we've powered growth for over a decade.
        </span>
      </div>

      <div className="stat-block">
        <div className="stat-icon-circle" style={{ backgroundColor: "#16a34a" }}>
          <FaRedoAlt />
        </div>
        <h3>97%</h3>
        <p className="stat-label">Client Retention</p>
        <span className="stat-desc">
          Our long-term client relationships are built on trust and results.
        </span>
      </div>

      <div className="stat-block">
        <div className="stat-icon-circle" style={{ backgroundColor: "#f59e0b" }}>
          <FaBullhorn />
        </div>
        <h3>1.2K+</h3>
        <p className="stat-label">Campaigns Launched</p>
        <span className="stat-desc">
          Across industries and platforms — each with a clear goal and solid execution.
        </span>
      </div>

      <div className="stat-block">
        <div className="stat-icon-circle" style={{ backgroundColor: "#8b5cf6" }}>
          <FaEye />
        </div>
        <h3>50M+</h3>
        <p className="stat-label">Ad Impressions</p>
        <span className="stat-desc">
          Targeted reach that gets your brand in front of the right eyes — at scale.
        </span>
      </div>
    </div>
  </div>
</motion.section>

    </section>
  );
};

export default About;
