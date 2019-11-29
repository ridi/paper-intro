import { css } from 'astroturf';
import React from 'react';

import AccessoryBanner from '../components/AccessoryBanner';
import Details from '../components/details';
import Features from '../components/features';
import Hero from '../components/hero/IndexPage';
import Layout from '../components/layout';
import Ridibatang from '../components/ridibatang';
import SEO from '../components/seo';
import Specs from '../components/specs';
import ViewerFeatures from '../components/viewer-features';

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

const IndexPage = () => {
  return (
    <Layout className={styles.main}>
      <SEO title="Home" />
      <Hero />
      <Features />
      <ViewerFeatures />
      <Details />
      <Ridibatang />
      <AccessoryBanner />
      <Specs />
    </Layout>
  );
};

export default IndexPage;
