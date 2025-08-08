import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../components/Home/Home';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ServicePage from '../components/Services/ServicesPage';
import Services from '../components/Services/Services';
import Process from '../components/Process/Process';
import Strategies from '../components/Strategies/Strategies';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import TechStack from '../components/TechStack/TechStack';
import Disclaimer from '../components/Disclaimer/Disclaimer';
import PrivacyPolicy from '../components/PrivacyPolicy/PrivacyPolicy';
import Terms from '../components/Terms/Terms';
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';
import AdsIllustration from '../components/Services/Adsillustration/AdsIllustration';


const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]);

  return null;
};


const MainContent = ({ children }) => {
  const location = useLocation();

  
  const isAdjustedRoute = ["/services", "", "/contact"].includes(location.pathname);


  const style = isAdjustedRoute
    ? { minHeight: "60vh" }
    : {};

  return <div style={style}>{children}</div>;
};


const Container = () => {
  return (
    <>
    <Router>
    <ScrollToTop />
            <div class="circle-bg">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
    <div class="circle"></div>
      <div class="circle"></div>
</div>
       <Header />
        <MainContent >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
          <Route path="/services/ads/:adsid" element={<AdsIllustration />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/our-strategies" element={<Strategies />} />
           <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-condition" element={<Terms />} />
        </Routes>
        </MainContent>
        <TechStack />
        <Footer />
        <ScrollToTopButton />
    </Router>
    </>
  );
};

export default Container;
