import { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import AccessoryBanner from '../components/AccessoryBanner';
import Details from '../components/details';
import Features from '../components/feature';
import ViewerFeature from '../components/viewer-feature';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Ridibatang from '../components/ridibatang';
import SEO from '../components/seo';
import Specs from '../components/specs';

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
    color: hsla(0, 0%, 0%, 0.6);

    @media (max-width: 800px) {
      font-size: 18px;
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      bg: file(relativePath: {eq: "bg-landing.jpg"}) {
        childImageSharp {
          fluid(
            maxWidth: 1600
            sizes: "(max-width: 800px) 1244px, 1600px"
            srcSetBreakpoints: [1244, 1600, 1866, 2400, 2488, 3200, 3110, 3732, 4000, 4354, 4800]
          ) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);

  function renderBackground(props: { className: string }) {
    return <PolyfillImg className={props.className} fluid={data.bg.childImageSharp.fluid} />;
  }

  return (
    <Layout className={styles.main}>
      <SEO title="Home" />
      <Hero renderBackground={renderBackground} />
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
