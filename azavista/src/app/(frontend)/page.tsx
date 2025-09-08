import React from 'react';
import './globals.css';


import HeroBlock from './components/HeroBlock';
import SmarterEvents from './components/SmarterEvents';
import TabsSection from './components/TabsSection';
import CustomFeature from './components/CustomFeature';
import WhyAzavista from './components/WhyAzavista';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Seamless from './components/Seamless';
import Getstarted from './components/Getstarted';

export const revalidate = 60; //60secs

export default async function HomePage() {

  return (
    <>
      <HeroBlock />
      <SmarterEvents />
      <TabsSection />
      <CustomFeature />
      <WhyAzavista />
      <CaseStudies />
      <Testimonials />
      <Seamless />
      <Getstarted />

    </>
  );
}
