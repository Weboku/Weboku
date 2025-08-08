import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassChart,
  faWandMagicSparkles,
  faVectorSquare,
  faServer,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./Process.css";

const marketingSteps = [
  {
    title: "Market & Audience Research",
    description:
      "We identify customer segments, analyze competitors, and gather insights to guide effective targeting.",
    icon: faMagnifyingGlassChart,
  },
  {
    title: "Strategy & Funnel Mapping",
    description:
      "We build strategic funnels tailored to your business goals—SEO, ads, content, and automation aligned.",
    icon: faWandMagicSparkles,
  },
  {
    title: "Creative Assets & Branding",
    description:
      "Our team designs compelling creatives, copy, and branding to ensure every message resonates with impact.",
    icon: faVectorSquare,
  },
  {
    title: "Campaign Execution",
    description:
      "We launch across key channels—Google Ads, Meta, Email, SEO—using agile and scalable frameworks.",
    icon: faServer,
  },
  {
    title: "Data-Driven Optimization",
    description:
      "We track performance in real time, iterate using A/B testing, and scale winning campaigns efficiently.",
    icon: faInfinity,
  },
];

const Process = () => {
  return (
    <section className="kinetic-process">
      <motion.div
        className="kinetic-intro"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Our Digital Marketing Process</h2>
        <p>
          We blend strategy, creativity, and analytics to execute campaigns that deliver measurable growth and real ROI.
        </p>
      </motion.div>

      <div className="kinetic-steps-container">
        {marketingSteps.map((step, index) => (
          <motion.div
            key={index}
            className="kinetic-step"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="kinetic-icon">
              <FontAwesomeIcon icon={step.icon} />
            </div>
            <div className="kinetic-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {index < marketingSteps.length - 1 && <div className="kinetic-line" />}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
