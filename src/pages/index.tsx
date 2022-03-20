import { css } from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useRef } from 'react';

import React from 'react';

import Layout from '@/components/common/Layout';
import SEO from '@/components/common/SEO';
import { ScrollmagicProvider } from '@/components/ridipaper4/RidiPaper4ScrollmagicContext';

import { DelayPopup } from '@/components/ridipaper4/Popup';
import { Design } from '@/components/ridipaper4/Design';
import { DeviceFeatures } from '@/components/ridipaper4/DeviceFeatures';
import { Features } from '@/components/ridipaper4/Features';
import { Gallery } from '@/components/ridipaper4/Gallery';
import { Hero } from '@/components/ridipaper4/Hero';
import { LightboxContextProvider } from '@/components/ridipaper4/Lightbox';
import { Manual } from '@/components/ridipaper4/Manual';
import { PurchaseBanner } from '@/components/ridipaper4/PurchaseBanner';
import { QuickButton } from '@/components/ridipaper4/QuickButton';
import { Specs } from '@/components/ridipaper4/Specs';
import { Video } from '@/components/ridipaper4/Video';

import '@/fonts/Pretendard';

const styles = css`
  .main {
    font-family: 'Pretendard', sans-serif;
  }

  .container {
    width: 100%;
  }
`;

const IS_PURCHASE_ENABLED = false;
const RidiPaper4Page = () => {
  const data = useStaticQuery(graphql`
    {
      banner: file(relativePath: { eq: "images/meta/paper4/og.png" }) {
        publicURL
      }
    }
  `);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Layout className={styles.main} containerClassName={styles.container}>
      <LightboxContextProvider value={ref}>
        <ScrollmagicProvider>
          <SEO
            meta={[{ property: 'og:image', content: data.banner.publicURL }]}
          />
          <DelayPopup />
          <Hero />
          <Design />
          <DeviceFeatures />
          <Features />
          <QuickButton />
          <Video />
          <Gallery />
          {IS_PURCHASE_ENABLED && <PurchaseBanner />}
          <Specs />
          <Manual />
        </ScrollmagicProvider>
      </LightboxContextProvider>

      <div ref={ref} />
    </Layout>
  );
};

export default RidiPaper4Page;
