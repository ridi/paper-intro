import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { LinkButton } from '@/components/Button';
import Hero from '@/components/Hero';

import RidipaperLogo from '@/svgs/ridipaper/ridipaper.inline.svg';

const HeroContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 230px 100px 100px;

  @media (max-width: 800px) {
    padding: 130px 0 180px;
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

const LinkWrapper = styled<'div', { runAnimation?: boolean }>('div')`
  margin-top: 100px;
  opacity: 0;

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

  .purchase {
    width: 200px;
  }
`;

export default function RidiPaperHero() {
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
        <LinkWrapper runAnimation={runAnimation}>
          <LinkButton noOpacity color="blue-bg" to="/stockists/" className={styles.purchase}>
            구매하기
          </LinkButton>
        </LinkWrapper>
      </HeroContainer>
    </Hero>
  );
}
