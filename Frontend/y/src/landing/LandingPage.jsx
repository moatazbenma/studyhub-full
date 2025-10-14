import React from 'react'
import Hero from './Hero';
import About from './About';
import Features from './Features';
import Screenshots from './Screenshots';
import Founder from './Founder';
import Footer from './Footer';
import Pricing from './Prices';
import Contact from './Contact';

const LandingPage = () => {
  return (
    <div className='overflow-x-hidden'>
        <Hero/>
        <About/>
        <Features/>
        <Screenshots/>        
        <Founder/>
        <Pricing/>
        <Contact/>
        <Footer/>
    </div>  
  )
}

export default LandingPage