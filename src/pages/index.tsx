import { css } from 'astroturf';
import React from 'react';

import Features from '../components/feature';
import ViewerFeature from '../components/viewer-feature';
import Hero from '../components/hero';
import Layout from '../components/layout';
import SEO from '../components/seo';

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
  }
`;

css`
  h3 {
    font-size: 50px;
    line-height: 64px;
    text-align: center;

    @media (max-width: 800px) {
      font-size: 32px;
      line-height: 48px;
    }
  }

  p {
    font-size: 20px;
    line-height: 28px;
    color: #636c73;

    @media (max-width: 800px) {
      font-size: 18px;
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
    </Layout>
  );
};

export default IndexPage;
