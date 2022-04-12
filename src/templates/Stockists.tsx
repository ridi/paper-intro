import styled from 'astroturf';
import React from 'react';

import { graphql, Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import Layout from '@/components/common/Layout';
import SEO from '@/components/common/SEO';
import Tabs, { Tab } from '@/components/common/Tabs';

import AccessoryHero from '@/components/accessories/AccessoryHero';

import Outlink from '@/svgs/outlink.inline.svg';

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

const StockistsWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 100px 0;

  display: flex;

  @media (max-width: 800px) {
    display: block;
  }

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const StockistsColumn = styled.div`
  flex: 1;
`;

const Spacer = styled.div`
  width: 100px;

  @media (max-width: 800px) {
    display: none;
  }
`;

const StockistItem = styled.a`
  display: block;
  height: 60px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #d1d5d9;
  font-size: 17px;
  line-height: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #40474d;

  > svg {
    width: 12px;
    height: 12px;
    margin-left: 10px;
    fill: #9ea7ad;
  }
`;

const tabs = [
  {
    id: 'ridipaper4',
    name: 'RIDIPAPER4',
  },
  {
    id: 'ridipaper',
    name: 'RIDIPAPER (3세대)',
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
    return (
      <PolyfillImg
        className={props.className}
        fluid={data.bg.childImageSharp.fluid}
      />
    );
  }

  const items = props.data.stockists.items.map(({ name, url }) => (
    <StockistItem key={url} href={url}>
      {name}
      <Outlink />
    </StockistItem>
  ));

  const leftCount = Math.floor((items.length + 1) / 2);
  const left = items.slice(0, leftCount);
  const right = items.slice(leftCount);

  return (
    <Layout>
      <SEO title="온라인 스토어" />
      <AccessoryHero renderBackground={renderBackground}>
        <h1>
          리디페이퍼
          <br />
          온라인 스토어
        </h1>
        <p>
          추천 쇼핑몰에서 리디페이퍼와
          <br />
          액세서리를 구매하세요.
        </p>
      </AccessoryHero>
      <StockistsTabWrapper>
        <Tabs>
          {tabs.map(({ id, name }) => (
            <Tab key={id} active={id === pageContext.slug}>
              <Link to={`/stockists/${id}/`}>{name}</Link>
            </Tab>
          ))}
        </Tabs>
      </StockistsTabWrapper>
      <StockistsWrapper>
        <StockistsColumn>{left}</StockistsColumn>
        <Spacer />
        <StockistsColumn>{right}</StockistsColumn>
      </StockistsWrapper>
    </Layout>
  );
}

export const query = graphql`
  query StockistsQuery($slug: String!) {
    bg: file(relativePath: { eq: "images/stockists-bg.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 600, quality: 80) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    stockists: stockistsYaml(slug: { eq: $slug }) {
      items {
        name
        url
      }
    }
  }
`;
