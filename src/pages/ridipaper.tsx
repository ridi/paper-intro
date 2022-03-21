import { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { ScrollmagicProvider } from '@/components/ridipaper/RidiPaperScrollMagicContext';
import Layout from '@/components/common/Layout';
import SEO from '@/components/common/SEO';

import AccessoryBanner from '@/components/ridipaper/AccessoryBanner';
import Details from '@/components/ridipaper/Details';
import Features from '@/components/ridipaper/Features';
import Panel from '@/components/ridipaper/Panel';
import Ridibatang from '@/components/ridipaper/Ridibatang';
import RidiPaperHero from '@/components/ridipaper/RidiPaperHero';
import Specs from '@/components/ridipaper/Specs';
import ViewerFeatures from '@/components/ridipaper/ViewerFeatures';

const styles = css`
  .main {
    > section {
      display: block;

      &:first-of-type {
        margin-top: 200px;

        @media (max-width: 800px) {
          margin-top: 80px;
        }
      }

      & + section {
        margin-top: 200px;

        @media (max-width: 800px) {
          margin-top: 120px;
        }
      }
    }
  }
`;

const RidiPaperPage = () => {
  const data = useStaticQuery(graphql`
    {
      banner: file(relativePath: { eq: "images/meta/ridipaper/og.jpg" }) {
        publicURL
      }
    }
  `);

  return (
    <Layout className={styles.main}>
      <ScrollmagicProvider>
        <SEO
          meta={[{ property: 'og:image', content: data.banner.publicURL }]}
        />
        <RidiPaperHero />
        <Features />
        <ViewerFeatures />
        <Panel />
        <Details />
        <Ridibatang />
        <AccessoryBanner />
        <Specs />
      </ScrollmagicProvider>
    </Layout>
  );
};

export default RidiPaperPage;
