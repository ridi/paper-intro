import { css } from 'astroturf';
import React from 'react';

import AccessoryBanner from '../components/AccessoryBanner';
import Details from '../components/details';
import Features from '../components/feature';
import Hero from '../components/hero/IndexPage';
import Layout from '../components/layout';
import Ridibatang from '../components/ridibatang';
import SEO from '../components/seo';
import Specs from '../components/specs';
import ViewerFeature from '../components/viewer-feature';

const styles = css`
  .main {
    > section {
      display: block;
    }

    > section + section {
      margin-top: 200px;

      @media (max-width: 800px) {
        margin-top: 120px;
      }
    }

    h2 {
      font-size: 50px;
      line-height: 64px;
      text-align: center;

      @media (max-width: 800px) {
        font-size: 32px;
        line-height: 48px;
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
      <ViewerFeature />
      <Details />
      <Ridibatang />
      <AccessoryBanner />
      <Specs />
    </Layout>
  );
};

export default IndexPage;
