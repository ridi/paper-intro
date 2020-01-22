import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import Hero from '../components/hero/Accessory';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tabs, { Tab } from '../components/Tabs';

import Flag from '../svgs/flag.inline.svg';
import Outlink from '../svgs/outlink.inline.svg';

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
  padding: 20px 100px 0;

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

const NoticeBoxContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 100px 0;

  @media (max-width: 600px) {
    padding: 20px 20px 0;
  }
`;

const NoticeBox = styled.p`
  padding: 10px 12px;

  display: flex;

  border-radius: 4px;
  background-color: #f2f4f5;

  font-size: 13px;
  line-height: 20px;

  > span {
    flex: 1;
    margin: 2px 0;
  }
`;

const styles = css`
  .flag {
    flex: 0 0 auto;
    margin-right: 4px;
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
      <NoticeBoxContainer>
        {pageContext.slug === 'ridipaper' && (
          <NoticeBox>
            <Flag className={styles.flag} />
            <span>
              리디페이퍼는 <strong>2020년 1월 29일 수요일 낮 12시</strong>부터
              판매됩니다.
            </span>
          </NoticeBox>
        )}
      </NoticeBoxContainer>
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
