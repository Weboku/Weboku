import React from "react";
import "./Strategies.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBullseye,
  faUserShield,
  faMobileAlt,
  faNetworkWired,
  faLightbulb,
  faCogs,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import CircleFeature from "../CircleFeature/CircleFeature";
import { useLocation } from "react-router-dom";

const strategyItems = [
  {
    icon: faRocket,
    title: "Scalable Solutions",
    description: "From startups to enterprises, our digital strategies scale with your ambitions.",
    bgColor: "#e0f7ff",
    iconColor: "#0ea5e9",
  },
  {
    icon: faLightbulb,
    title: "Creative Innovation",
    description: "We combine data and creativity to craft designs that truly stand out.",
    bgColor: "#fff7ec",
    iconColor: "#f59e0b",
  },
  {
    icon: faNetworkWired,
    title: "Omnichannel Approach",
    description: "Ensure brand consistency and seamless engagement across every digital touchpoint.",
    bgColor: "#eef6ff",
    iconColor: "#3b82f6",
  },
  {
    icon: faUserShield,
    title: "Secure by Design",
    description: "Our frameworks prioritize privacy, compliance, and protection for your audience.",
    bgColor: "#ffeaea",
    iconColor: "#f97316",
  },
];


// Delayed in-view trigger for mobile/tablet
function useViewportMotion() {
  const [vp, setVp] = React.useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    // Desktop: earlier trigger; Mobile/Tablet: require more scroll
    return w >= 992
      ? { once: true, amount: 0.25, margin: "0px 0px -10% 0px" }   // desktop
      : { once: true, amount: 0.6,  margin: "-15% 0px -15% 0px" }; // mobile/tablet
  });

  React.useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setVp(w >= 992
        ? { once: true, amount: 0.25, margin: "0px 0px -10% 0px" }
        : { once: true, amount: 0.6,  margin: "-15% 0px -15% 0px" }
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return vp;
}



const Strategies = () => {

  const location = useLocation();
    const vp = useViewportMotion();

  return (
    <>
    <section className="strategies-modern">
      <motion.div
        className="strategies-modern-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
         viewport={vp} 
      >
        <h2>Digital Strategies That Drive Impact</h2>
        <p>
          We blend data, design, and automation to craft full-funnel strategies
          that generate growth — not just traffic.
        </p>
      </motion.div>

     <div className="strategies-modern-grid">
  {strategyItems.map((item, index) => (
    <motion.div
      className="strategy-modern-card-alt"
      key={index}
      style={{
        backgroundColor: item.bgColor,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
       viewport={vp} 
    >
      <div
        className="strategy-icon-glow"
        style={{
          backgroundColor: item.iconColor + "20",
          color: item.iconColor,
        }}
      >
        <FontAwesomeIcon icon={item.icon} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </motion.div>
  ))}
</div>

    </section>
    {location.pathname === "/our-strategies" && <CircleFeature />}
    </>
  );
};

export default Strategies;
