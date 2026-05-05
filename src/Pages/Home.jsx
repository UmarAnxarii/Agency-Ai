import React from 'react'

import Hero from '../Components/Hero';
import Logo from '../Components/Logo';
import Services from '../Components/Services';
import Projects from '../Components/Projects';
import Contact from '../Components/Contact';

const Home = () => {
  return (
    <div>
        <Hero/>
        <Logo/>
        <Services/>
        <Projects/>
        <Contact/>
    </div>
  )
}

export default Home