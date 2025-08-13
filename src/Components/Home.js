import React from 'react'

import Slides from './Slides'
import UIRadarFeatures from './RapidReachFeatures';
import Section2 from './Section2';
import Footer from './Footer';
import CustomerNavbar from './CustomerNavbar';
import Packages from './Packages';
import Section1 from './Section1';
import RapidReachFeatures from './RapidReachFeatures';

function Home() {
  return (
    <div>
      <CustomerNavbar />
      <Slides/>
      <Section1 />
      <RapidReachFeatures />
      <Section2/>
      <Footer/>
    </div>
  )
}

export default Home;