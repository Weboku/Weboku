import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocalContext } from "../../context/LocalContext";
import "./ServicesPage.css";
import {
  faChartLine,
  faTrafficLight,
  faFileAlt,
  faBullhorn,
  faChartPie,
  faBolt,
  faGlobe,
  faUserPlus,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServicesPage = () => {
  const { serviceId } = useParams();
  const { webinfo } = useLocalContext();

  // ---- your same data (unchanged) ----
    const serviceData = [

    {
  id: "seo",
  title: "SEO Services",
  description:
    "Improve your search rankings, drive qualified traffic, and increase visibility across platforms with performance-focused SEO strategies.",
  details:
    "SEO is more than keywords — it’s a long-term growth strategy. Our SEO service covers everything from technical audits and on-page optimization to content marketing and backlink strategies. Whether you’re a local business or an enterprise, we tailor SEO that aligns with your goals and converts traffic into action.",
  image:
    "https://res.cloudinary.com/dlcgjnkvv/image/upload/v1754027883/Digital%20Marketting/seo-search-engine-optimization-concept_n8ixcu.jpg",
  features: [
    "Comprehensive site audits and technical SEO fixes.",
    "On-page optimization for all key landing pages.",
    "Keyword research tailored to your industry and audience.",
    "High-authority link-building and outreach strategies.",
    "SEO-driven content planning and publishing.",
    "Monthly performance reports: keyword rank, traffic, conversions."
  ],
  testimonials: [
    {
      name: "Priya Mehta",
      feedback:
        "Our website went from page 5 to the top of page 1 on Google. The organic leads just keep coming in."
    },
    {
      name: "Ankur Jain",
      feedback:
        "They don’t just promise rankings — they deliver. Our traffic and revenue have both doubled."
    },
    {
      name: "Meenal Singh",
      feedback:
        "Their SEO game is tight. Clean audits, solid backlinks, and real insights each month. Highly recommend."
    }
  ],
  faqs: [
    {
      question: "How long does it take to see SEO results?",
      answer:
        "Typically, noticeable improvements occur within 2–3 months, with stronger results over 6–12 months depending on your site and competition."
    },
    {
      question: "Do you offer local SEO for small businesses?",
      answer:
        "Yes, we specialize in local SEO strategies, including Google Business optimization and location-based keyword targeting."
    },
    {
      question: "Can you help with content for SEO?",
      answer:
        "Absolutely. We provide SEO-optimized blog writing, landing page content, and full content calendars aligned with keyword strategy."
    }
  ],
  growth: {
    title: "SEO Growth Metrics",
    chartData: [
      { label: "Keyword Ranking", value: 78 },
      { label: "Organic Traffic", value: 84 },
      { label: "Backlink Authority", value: 67 },
      { label: "Conversion Rate", value: 73 }
    ],
    highlights: [
      { icon: faChartLine, text: "Top 3 rank for 20+ target keywords" },
      { icon: faTrafficLight, text: "84% organic traffic increase in 90 days" },
      { icon: faFileAlt, text: "2x more leads from SEO-optimized landing pages" }
    ]
  }
},
{
  id: "ads",
  title: "Ad Services",
  description:
    "Launch and manage conversion-driven ad campaigns on Google, Meta, and more — backed by data and real-time performance optimization.",
  details:
    "Advertising isn't just about spending money — it's about making every click count. Our Ad Services deliver full-funnel campaigns across Google, Facebook, Instagram, and YouTube. We handle everything: strategy, creatives, targeting, A/B testing, and daily optimizations — so you get results, not guesswork.",
  image:
    "https://cdni.iconscout.com/illustration/premium/thumb/male-web-designer-8621249-6838917.png",
  features: [
    "Cross-platform ad campaigns: Google, Meta, LinkedIn, YouTube.",
    "Full-funnel setup: awareness, interest, conversion, retargeting.",
    "Ad copywriting, creative design, and video ad production.",
    "Advanced audience segmentation and geo-targeting.",
    "A/B testing and real-time bid optimization.",
    "Detailed reports: CPC, ROAS, CTR, impressions, conversions."
  ],
  subcategories: [
    {
      name: "Meta Ads",
      route: "/services/ads/meta-ads",
      img:"https://res.cloudinary.com/dlcgjnkvv/image/upload/v1750426831/Digital%20Marketting/Tech%20Stack/6033716_o4df5g.png"
    },
    {
      name: "Google Ads",
      route: "/services/ads/google-ads",
      img:"https://res.cloudinary.com/dlcgjnkvv/image/upload/v1750426823/Digital%20Marketting/Tech%20Stack/google-ads_sqagqu.svg"
    }
  ],
  testimonials: [
    {
      name: "Sahil Bansal",
      feedback:
        "Our ROAS improved by 4x in the first month. Their ad team knows exactly how to get high-value traffic."
    },
    {
      name: "Neha Verma",
      feedback:
        "From creatives to performance — everything feels premium. We scaled our monthly leads with the same ad spend."
    },
    {
      name: "Jayesh Kumar",
      feedback:
        "They took over our Google Ads and it’s been smooth scaling since. The numbers speak for themselves."
    }
  ],
  faqs: [
    {
      question: "Which platforms do you run ads on?",
      answer:
        "We run campaigns on Google Ads (Search, Display, YouTube), Meta (Facebook & Instagram), LinkedIn, and more depending on your goals."
    },
    {
      question: "What’s your minimum ad budget requirement?",
      answer:
        "We usually recommend a starting monthly ad budget of ₹15,000–₹25,000 for meaningful results, depending on your industry."
    },
    {
      question: "Do you create ad creatives too?",
      answer:
        "Yes — we handle everything from copywriting to designing high-converting banners, videos, and carousel ads."
    }
  ],
  growth: {
    title: "Ad Campaign Growth Metrics",
    chartData: [
      { label: "Click-Through Rate (CTR)", value: 79 },
      { label: "Conversion Rate", value: 75 },
      { label: "Cost per Click (CPC)", value: 65 },
      { label: "Return on Ad Spend (ROAS)", value: 83 }
    ],
    highlights: [
      { icon: faBullhorn, text: "4x ROAS for multiple campaigns in Q2" },
      { icon: faChartPie, text: "35% lower CPC with optimized bidding" },
      { icon: faBolt, text: "Rapid A/B testing improved CTR by 2.6x" }
    ]
  }
},
{
  id: "digital",
  title: "Digital Marketing",
  description:
    "From brand building to lead generation — scale your digital presence with our full-suite digital marketing services and analytics.",
  details:
    "We combine strategy, content, design, and data to create marketing that doesn’t just look good — it performs. From SEO and ads to content, analytics, and CRO, our digital marketing service is the full stack your business needs to grow online. Whether you want awareness, traffic, or conversions — we deliver, track, and improve at every step.",
  image:
    "https://img.graphicsurf.com/2020/01/digital-marketing-vector-illustration5.jpg",
  features: [
    "Comprehensive strategy: SEO, SEM, email, content, and analytics.",
    "Website optimization: speed, UX, CRO (conversion rate optimization).",
    "Content marketing: blogs, videos, guides, newsletters.",
    "Marketing automation setup for funnels and workflows.",
    "Detailed monthly reporting and analytics dashboards.",
    "Audience persona building and behavior analysis."
  ],
  subcategories: [
    {
      name: "Content Marketing",
      route: "/services/digital/content-marketing",
      img:"https://image.freepik.com/free-vector/content-marketing-vector-illustration_427922-312.jpg"
    },
    {
      name: "Marketing Analytics",
      route: "/services/digital/marketing-analytics",
      img:"https://static.vecteezy.com/system/resources/previews/005/360/451/original/online-data-analysis-flat-illustration-of-data-analytics-vector.jpg"
    }
  ],
  testimonials: [
    {
      name: "Ankita S.",
      feedback:
        "This isn’t just marketing — it’s digital transformation. We’re now getting consistent leads every week, organically and through campaigns."
    },
    {
      name: "Rohan Desai",
      feedback:
        "They planned and executed our entire funnel from scratch — now we’re tracking every step from click to conversion. Super organized."
    },
    {
      name: "Pooja Nair",
      feedback:
        "Our site, ads, SEO, and email — all managed under one roof. Saved us time and money, and improved performance massively."
    }
  ],
  faqs: [
    {
      question: "Do you handle both organic and paid strategies?",
      answer:
        "Yes — we offer a full-stack approach that includes SEO, content, paid ads, email marketing, analytics, and more."
    },
    {
      question: "Can you work with our in-house team?",
      answer:
        "Absolutely — we collaborate with internal teams or handle marketing end-to-end depending on your preference."
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We’ve worked across SaaS, retail, education, real estate, healthcare, and more. We tailor strategies to each niche."
    }
  ],
  growth: {
    title: "Digital Marketing Growth Metrics",
    chartData: [
      { label: "Traffic Increase", value: 88 },
      { label: "Lead Generation", value: 74 },
      { label: "Conversion Rate", value: 79 },
      { label: "Audience Retention", value: 69 }
    ],
    highlights: [
      { icon: faGlobe, text: "300% website traffic boost in 90 days" },
      { icon: faUserPlus, text: "Steady 2x monthly leads across campaigns" },
      { icon: faGaugeHigh, text: "Enhanced retention with CRO and remarketing" }
    ]
  }
},


  ];
  const service = serviceData.find((s) => s.id === serviceId);
  if (!service) return <div className="svcpg-wrap"><h1>Service Not Found</h1></div>;

  const fadeUp = (d = 0) => ({
    initial: { opacity: 0, y: 30 },
    // whileInView: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3,margin: "-80px 0px -80px 0px"  },
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  });

  return (
    <div className="svcpg-wrap">
      {/* HERO */}
      <motion.header className="svcpg-hero" {...fadeUp(.05)}>
        <div className="svcpg-hero-inner">
          <div className="svcpg-hero-text">
            <span className="svcpg-badge">Service</span>
            <h1>{service.title}</h1>
            <p>{service.description}</p>

            <div className="svcpg-stats">
              <div className="stat">
                <strong>+100%</strong>
                <span>Avg. Growth</span>
              </div>
              <div className="stat">
                <strong>90 Days</strong>
                <span>To First Wins</span>
              </div>
              <div className="stat">
                <strong>ROI‑Led</strong>
                <span>Strategy</span>
              </div>
            </div>
          </div>

          <div className="svcpg-hero-cta">
            <button className="svcpg-btn" onClick={() => (window.location.href = "tel:" + webinfo.phone)}>
              Call Us: {webinfo.phone}
            </button>
            <span className="svcpg-help">No sales fluff—just solutions.</span>
          </div>
        </div>
      </motion.header>

      {/* SUBCATEGORIES */}
      {service.subcategories && (
        <motion.section className="svcpg-subcats" {...fadeUp(.05)}>
          <h3>Explore Related Services</h3>
          <div className="svcpg-subgrid">
            {service.subcategories.map((sub, i) => (
              <a key={i} href={sub.route} className="svcpg-subcard">
                <div className="imgbox">
                  {sub.img ? <img src={sub.img} alt={sub.name} /> : <div className="imgph" />}
                </div>
                <div className="meta">
                  <span>{sub.name}</span>
                  <em>Learn more →</em>
                </div>
              </a>
            ))}
          </div>
        </motion.section>
      )}

      {/* MAIN SPLIT */}
      <section className="svcpg-main">
        <motion.article className="svcpg-about glass" {...fadeUp(.1)}>
          <h2>About the Service</h2>
          <p className="lede">{service.details}</p>

          <h3>Key Features</h3>
          <ul className="svcpg-feats">
            {service.features.map((f, i) => (
              <li key={i}>
                <span className="tick">✔</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="svcpg-inline-cta">
            <button className="svcpg-btn secondary" onClick={() => (window.location.href = "/contact")}>
              Talk to an Expert
            </button>
            <button className="svcpg-btn ghost" onClick={() => (window.location.href = "tel:" + webinfo.phone)}>
              Call Now
            </button>
          </div>
        </motion.article>

        <motion.figure className="svcpg-visual" {...fadeUp(.15)}>
          <img src={service.image} alt={service.title} />
          <figcaption>Execution + Insights = Compounding Growth</figcaption>
        </motion.figure>
      </section>

      {/* GROWTH */}
      {service.growth && (
        <motion.section className="svcpg-growth" {...fadeUp(.1)}>
          <h2><FontAwesomeIcon icon={faChartLine} /> {service.growth.title}</h2>

          <div className="bars">
            {service.growth.chartData.map((d, i) => (
              <div className="bar" key={i}>
                <div className="bar-head">
                  <label>{d.label}</label>
                  <span className="val">{d.value}%</span>
                </div>
                <div className="bar-rail">
                  <div className="bar-fill" style={{ width: `${d.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <ul className="hi-list">
            {service.growth.highlights.map((h, i) => (
              <li key={i}>
                <FontAwesomeIcon icon={h.icon} />
                {h.text}
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* TESTIMONIALS */}
      <motion.section className="svcpg-testis" {...fadeUp(.1)}>
        <h2>What Our Clients Say</h2>
        <div className="tgrid">
          {service.testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              className="tcard"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .45, delay: i * .05 }}
            >
              <p>“{t.feedback}”</p>
              <footer>— {t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ServicesPage;
