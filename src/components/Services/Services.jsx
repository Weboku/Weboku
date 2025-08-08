import React from "react";
import "./Services.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OtherServices from "./OtherServices";
import { FaSearch, FaBullhorn, FaChartLine } from "react-icons/fa";

const services = [
  {
    title: "SEO Services",
    description:
      "Improve your search rankings, drive qualified traffic, and increase visibility across platforms with performance-focused SEO strategies.",
    iconColor: "#3b82f6", // blue
    iconShadow: "rgba(59,130,246,0.3)",
    link: "/services/seo",
    icon: <FaSearch />,
  },
  {
    title: "Ad Services",
    description:
      "Launch and manage conversion-driven ad campaigns on Google, Meta, and more — backed by data and real-time performance optimization.",
    iconColor: "#f97316", // orange
    iconShadow: "rgba(249,115,22,0.3)",
    link: "/services/ads",
    icon: <FaBullhorn />,
  },
  {
    title: "Digital Marketing",
    description:
      "From brand building to lead generation — scale your digital presence with our full-suite digital marketing services and analytics.",
    iconColor: "#8b5cf6", // purple
    iconShadow: "rgba(139,92,246,0.3)",
    link: "/services/digital",
    icon: <FaChartLine />,
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="services-pro">
        <div className="services-pro-header">
          <h2>
            Your Growth Engine: <span>Weboku Services</span>
          </h2>
          <p>Strategic. Scalable. Built to convert.</p>
        </div>
        <div className="services-pro-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="services-pro-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onClick={() => navigate(service.link)}
            >
              <div className="services-icon-wrapper">
                <div
                  className="hexagon"
                  style={{
                    fill: service.iconColor,
                    filter: `drop-shadow(4px 5px 4px ${service.iconShadow})`,
                  }}
                >
                  <svg viewBox="0 0 177.4 197.4">
                    <path d="M0,58.4v79.9c0,6.5,3.5,12.6,9.2,15.8l70.5,40.2c5.6,3.2,12.4,3.2,18,0l70.5-40.2c5.7-3.2,9.2-9.3,9.2-15.8V58.4 
                    c0-6.5-3.5-12.6-9.2-15.8L97.7,2.4c-5.6-3.2-12.4-3.2-18,0L9.2,42.5C3.5,45.8,0,51.8,0,58.4z" />
                  </svg>
                </div>
                <div className="fa-icon">{service.icon}</div>
              </div>

              <div className="services-pro-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="services-pro-link">Learn More →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <OtherServices />
    </>
  );
};

export default Services;
