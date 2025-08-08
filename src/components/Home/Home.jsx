import React from 'react'
import './Home.css'
import Hero from '../Hero/Hero'
import Services from '../Services/Services'
import Process from '../Process/Process'
import Strategies from '../Strategies/Strategies'
import TechStack from '../TechStack/TechStack'
import Banner from '../Banner/Banner'
import OneClickSection from '../OneClickSection/OneClickSection'
import CircleFeature from '../CircleFeature/CircleFeature'
import SEOFeatures from '../SEOFeatures/SEOFeatures'
import Testimonials from '../Testimonials/Testimonials'
import FaqSection from '../FaqSection/FaqSection'

const Home = () => {
  return (
    <div>
      <Hero />
      <OneClickSection />
        <Testimonials /> 
      <Services />
      <CircleFeature />
      <Banner />
      <Process />
      <SEOFeatures />
      <Strategies />
    
      <FaqSection />
       
    </div>
  )
}

export default Home
