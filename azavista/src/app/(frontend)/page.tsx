import { getPayload } from 'payload';
import React from 'react';
import config from '@/payload.config';
import './globals.css';

import Navbar from './components/Navbar';
import HeroBlock from './components/HeroBlock';
import SmarterEvents from './components/SmarterEvents';
import TabsSection from './components/TabsSection';

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

  // Fetch Event Features (Tabs)
  const tabsRes = await payload.find({
    collection: 'event-features',
    limit: 5,
  });
  const tabs = tabsRes.docs;

  return (
    <>
      <Navbar />
      {hero && <HeroBlock data={hero} />}
      {smartEvent && <SmarterEvents data={smartEvent} />}
      {tabs.length > 0 && <TabsSection tabs={tabs} />}
    </>
  );
}
