import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

import Button from '../Button';
import Hero from './index';

import RidipaperLogo from '../../svgs/ridipaper.inline.svg';
import NaverLogo from '../../svgs/naver.svg';
import Logo29CM from './29cm.png';

const HeroContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 230px 100px 100px;

  @media (max-width: 800px) {
    padding: 130px 0 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #1c53b7;

  & picture,
  & img {
    flex: 0 0 auto;
    width: 100%;
    min-width: 1600px;

    @media (max-width: 800px) {
      min-width: 800px;
    }
  }
`;

const HeroTitle = styled<'div', { runAnimation?: boolean }>('div')`
  color: white;

  > p,
  > h1 {
    opacity: 0;
  }

  > p {
    color: white;
    font-size: 40px;
    line-height: 1.5em;
    font-weight: 300;
    letter-spacing: -1px;

    @media (max-width: 800px) {
      font-size: 24px;
    }
  }

  > h1 {
    margin-top: 20px;

    @media (max-width: 800px) {
      margin-top: 15px;
    }

    > span {
      display: inline-block;
      width: 0;
      height: 0;
      overflow: hidden;
    }
  }

  &.runAnimation {
    > p,
    > h1 {
      animation: show 0.5s forwards;
    }

    > h1 {
      animation-delay: 0.2s;
    }
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PurchaseLinks = styled<'ul', { runAnimation?: boolean }>('ul')`
  display: flex;
  margin-top: 100px;
  opacity: 0;

  @media (max-width: 800px) {
    display: block;
  }

  > li {
    list-style: none;

    & + li {
      margin-left: 8px;

      @media (max-width: 800px) {
        margin-left: 0;
        margin-top: 10px;
      }
    }
  }

  a {
    width: 200px;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
  }

  &.runAnimation {
    animation: show 0.5s 0.4s forwards;
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const styles = css`
  .logo {
    width: 398.39px;
    height: 60px;
    fill: white;

    @media (max-width: 800px) {
      width: 265.58px;
      height: 40px;
    }
  }

  .purchase29cm {
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: black;
    color: white;

    > img {
      height: 20px;
      margin-right: 2px;
    }
  }

  .purchaseNaver {
    border: 0;
    background-color: #1ec800;
    color: white;

    > img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
  }
`;

export default function IndexHero() {
  const [runAnimation, setRunAnimation] = React.useState(false);
  const data = useStaticQuery(graphql`
    {
      desktop: file(relativePath: {eq: "images/bg-landing.jpg"}) {
        childImageSharp {
          fluid(maxWidth: 1600, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      mobile: file(relativePath: {eq: "images/bg-landing-mobile.jpg"}) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);

  React.useEffect(() => {
    setRunAnimation(true);
  }, []);

  const track29CM = React.useCallback(() => {
    trackCustomEvent({
      category: 'home',
      action: 'click',
      label: '29cm',
    });
  }, []);

  const trackNaver = React.useCallback(() => {
    trackCustomEvent({
      category: 'home',
      action: 'click',
      label: 'naver',
    });
  }, []);

  function renderBackground() {
    return (
      <Background>
        <picture>
          <source srcSet={data.mobile.childImageSharp.fluid.srcSetWebp} media="(max-width: 800px)" type="image/webp" />
          <source srcSet={data.mobile.childImageSharp.fluid.srcSet} media="(max-width: 800px)" />
          <source srcSet={data.desktop.childImageSharp.fluid.srcSetWebp} type="image/webp" />
          <source srcSet={data.desktop.childImageSharp.fluid.srcSet} />
          <img src={data.desktop.childImageSharp.fluid.src} sizes="(max-width: 800px) 800px, 1600px" />
        </picture>
      </Background>
    );
  }

  return (
    <Hero bright renderBackground={renderBackground}>
      <HeroContainer>
        <HeroTitle runAnimation={runAnimation}>
          <p>세상이 나의 서재가 된다</p>
          <h1>
            <RidipaperLogo className={styles.logo} />
            <span>RIDIPAPER</span>
          </h1>
        </HeroTitle>
        <PurchaseLinks runAnimation={runAnimation}>
          <li>
            <Button noOpacity className={styles.purchase29cm} href="https://post.29cm.co.kr/8040" onClick={track29CM}>
              <img src={Logo29CM} alt="29CM" /> 에서 구매
            </Button>
          </li>
          <li>
            <Button noOpacity className={styles.purchaseNaver} href="https://smartstore.naver.com/ridibooks/products/4730376771" onClick={trackNaver}>
              <img src={NaverLogo} alt="네이버" /> 쇼핑 에서 구매
            </Button>
          </li>
        </PurchaseLinks>
      </HeroContainer>
    </Hero>
  );
}
