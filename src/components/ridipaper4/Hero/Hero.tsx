import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useEffect, useState } from 'react';

import HeroBase from '@/components/common/Hero';
import Ridipaper4Logo from '@/svgs/ridipaper4/ridipaper4.inline.svg';
import React from 'react';
import { LinkButton } from '@/components/common/Button';

const Background = styled('div')`
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

const HeroContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  padding: 0 108px;

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
    
    padding: 54px 18px;
    padding-top: 0;
  }
`;

const HeroHeader = styled('div')`
  & > * {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.5s ease;
    
    &:nth-child(2) {
      transition-delay: 0.2s;
    }
  }
  
  &[data-is-animated="true"] > * {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroPhrase = styled('p')`
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: black;
  
  padding-bottom: 22px;
`;

const HeroTitle = styled('h1')`
  width: 355px;
  height: 41px;
  color: black;
`;

const HeroLinkWrapper = styled<'div', { runAnimation?: boolean }>('div')`
  padding-top: 52px;
  
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.5s ease;
  transition-delay: 0.4s;
  
  &[data-is-animated="true"] {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroLinkButton = styled(LinkButton)`
  min-width: 130px;
  min-height: 40px;
  height: initial;
  padding: 10px;
  
  color: black;
  border: 1px solid black;
  border-radius: 20px;
  
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
`;

export const Hero = (): JSX.Element => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsAnimated(true), 300);
    return () => clearTimeout(timeoutId);
  }, []);
  
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
    <HeroBase bright renderBackground={renderBackground}>
      <HeroContainer>
        <HeroHeader data-is-animated={isAnimated}>
          <HeroPhrase>Simple Reading, Simple Living</HeroPhrase>
          <HeroTitle>
            <Ridipaper4Logo aria-label="RIDI PAPER 4" />
          </HeroTitle>
        </HeroHeader>
        <HeroLinkWrapper data-is-animated={isAnimated}>
          <HeroLinkButton noOpacity to="/stockists/">
            구매하기
          </HeroLinkButton>
        </HeroLinkWrapper>
      </HeroContainer>
    </HeroBase>
  );
};
