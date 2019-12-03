import styled from 'astroturf';
import React from 'react';

import { graphql, Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import Hero from '../components/hero/Accessory';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tabs, { Tab } from '../components/Tabs';

const StockistsTabWrapper = styled.nav`
  width: 100%;
  max-width: 1200px;
  margin: 50px auto 0;
  padding: 0 100px;

  @media (max-width: 600px) {
    margin: 0;
    padding: 0;
  }
`;

const tabs = [
  {
    id: 'ridipaper',
    name: 'RIDIPAPER',
  },
  {
    id: 'paper-pro',
    name: 'PAPER PRO',
  },
];

interface Props {
  data: {
    bg: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    stockists: {
      items: {
        name: string;
        url: string;
      }[];
    };
  };
  pageContext: {
    slug: string;
  };
}

export default function Stockists(props: Props) {
  const { data, pageContext } = props;

  function renderBackground(props: { className: string }) {
    return <PolyfillImg className={props.className} fluid={data.bg.childImageSharp.fluid} />;
  }

  return (
    <Layout>
      <SEO title="온라인 스토어" />
      <Hero renderBackground={renderBackground}>
        <h1>리디페이퍼<br />온라인 스토어</h1>
        <p>추천 쇼핑몰에서 리디페이퍼와<br />액세서리를 구매하세요.</p>
      </Hero>
      <StockistsTabWrapper>
        <Tabs>
          {tabs.map(({ id, name }) => (
            <Tab key={id} active={id === pageContext.slug}>
            <Link to={`/stockists/${id}/`}>{name}</Link>
            </Tab>
          ))}
        </Tabs>
      </StockistsTabWrapper>
    </Layout>
  );
}

export const query = graphql`
  query StockistsQuery($slug: String!) {
    bg: file(relativePath: {eq: "images/stockists-bg.jpg"}) {
      childImageSharp {
        fluid(maxHeight: 600, quality: 80) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    stockists: stockistsYaml(slug: {eq: $slug}) {
      items {
        name
        url
      }
    }
  }
`;
