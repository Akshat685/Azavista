import { getPayload } from 'payload';
import React from 'react';
import config from '@/payload.config';
import './globals.css';

import Navbar from './components/Navbar';
import HeroBlock from './components/HeroBlock';
import SmarterEvents from './components/SmarterEvents';
import TabsSection from './components/TabsSection';
import CustomFeature from './components/CustomFeature';
import WhyAzavista from './components/WhyAzavista';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';

export default async function HomePage() {
  const payload = await getPayload({ config });

  // Fetch Hero
  const heroRes = await payload.find({
    collection: 'hero',
    limit: 1,
  });
  const hero = heroRes.docs[0];

  // Fetch SmarterEvents
  const smartEventRes = await payload.find({
    collection: 'smarterEvents',
    limit: 1,
  });
  const smartEvent = smartEventRes.docs[0];

  const caseStudiesRes = await payload.find({
    collection: 'caseStudiesBlock',
    limit: 1,
  });
  const caseStudies = caseStudiesRes.docs[0];

  return (
    <>
      <Navbar />
      {hero && <HeroBlock data={hero} />}
      {smartEvent && <SmarterEvents data={smartEvent} />}
      <TabsSection />
      <CustomFeature />
      <WhyAzavista />
      {caseStudies && <CaseStudies data={caseStudies} />}
      <Testimonials />
    </>
  );
}
