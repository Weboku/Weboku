import React, { useState } from "react";
import "./FaqSection.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "What services does your agency provide?",
    answer:
      "We offer full-service digital marketing — including SEO, content marketing, PPC ads, branding, web development, and analytics.",
  },
  {
    question: "How quickly can we see results?",
    answer:
      "Most clients begin to see meaningful improvements in 4–6 weeks. It depends on your industry, strategy, and budget.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer:
      "We work with businesses of all sizes — from funded startups to established enterprises. Each strategy is customized.",
  },
  {
    question: "Will I have a dedicated account manager?",
    answer:
      "Yes. Every client is assigned a dedicated strategist who ensures communication is clear and goals are met efficiently.",
  },
  {
    question: "What’s your pricing model?",
    answer:
      "We offer flexible pricing — from project-based packages to monthly retainers. Pricing depends on service scope and duration.",
  },
  {
    question: "Can you work with our in-house team?",
    answer:
      "Absolutely. We often collaborate with in-house marketing, dev, or content teams to align efforts and boost outcomes.",
  },
  {
    question: "Do you offer custom website development?",
    answer:
      "Yes. We build responsive, SEO-friendly websites using modern frameworks with performance and conversions in mind.",
  },
  {
    question: "Is there a long-term contract required?",
    answer:
      "No. While long-term engagements yield stronger results, we also support short-term projects based on goals and budget.",
  },
  {
    question: "How do you measure campaign success?",
    answer:
      "We track KPIs like traffic, conversions, CPC, engagement rates, and ROI — and provide monthly reports with insights.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Post-launch, we provide support, maintenance, and optimization to ensure continued growth and smooth operations.",
  },
];


const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Answers to common questions from our clients and partners.</p>
      </div>

      <div className="faq-list">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className={`faq-item ${openIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
             initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
          >
            <div className="faq-question">
              <h4>{faq.question}</h4>
              <FaChevronDown className={`icon ${openIndex === index ? "rotate" : ""}`} />
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
