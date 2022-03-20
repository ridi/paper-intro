import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useFloatText } from '@/components/ridipaper4/hooks/useFloatText';
import { useMemo, useRef } from 'react';
import { useScrollmagicEffect } from '@/components/ridipaper4/RidiPaper4ScrollmagicContext';
import * as constants from './constants';

import Img from 'gatsby-image/withIEPolyfill';
import React from 'react';
import { ComponentType } from 'react';
import { FluidObject } from 'gatsby-image';
import { PinnedItem } from '@/components/ridipaper4/PinnedItem';

const deviceColorsImageQuery = graphql`
  query DeviceColorsImageQuery {
    black: file(relativePath: {eq: "images/ridipaper4/device-features/black-background.png"}) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    
    blackMobile: file(relativePath: {eq: "images/ridipaper4/device-features/black-background-mobile.png"}) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    
    white: file(relativePath: {eq: "images/ridipaper4/device-features/white-background.png"}) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    
    whiteMobile: file(relativePath: {eq: "images/ridipaper4/device-features/white-background-mobile.png"}) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

const DeviceColorsContainer = styled('section')`
  position: relative;
`;

const Background = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const BackgroundImage = styled(Img)`
  width: 100%;
  height: 100%;
` as ComponentType<{ fluid: FluidObject[], objectFit: 'cover' | 'contain' }>;

const TextContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(0, -50%);
  
  @media (max-width: 600px) {
    width: 90%;
    top: 80%;
    left: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const WhiteTextContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  color: #000000;
  white-space: nowrap;
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const BlackTextContainer = styled(WhiteTextContainer)`
  color: #ffffff;
`;

const SubTitle = styled('span')`
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  margin-left: 4px;
`;

const Title = styled('h2')`
  font-size: 36px;
  font-weight: 700;
  line-height: 58px;
`;

const ColorsContainer = styled('div')`
  display: flex;
  margin: 0 -16px;
  margin-top: 127px;
`;

const ColorDot = styled('button')`
  cursor: pointer;
  margin: 0 16px;
  width: 40px;
  height: 40px;
  border: 6px solid transparent;
  border-radius: 20px;
  background-clip: padding-box;
`;

const DURATION = 2000;
export const DeviceColors = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const blackDotRef = useRef<HTMLButtonElement>(null);
  const blackTextRef = useRef<HTMLDivElement>(null);
  const whiteRef = useRef<HTMLDivElement>(null);
  const whiteDotRef = useRef<HTMLButtonElement>(null);
  const whiteTextRef = useRef<HTMLDivElement>(null);
  const floatRef = useFloatText<HTMLDivElement>(
    containerRef,
    { ...constants.TEXT_FLOAT_OPTIONS, additionalTransform: 'translate(0, -50%)' }
  );
  
  const { black, blackMobile, white, whiteMobile } = useStaticQuery<{
    black: { childImageSharp: { fluid: FluidObject } },
    blackMobile: { childImageSharp: { fluid: FluidObject } },
    white: { childImageSharp: { fluid: FluidObject } },
    whiteMobile: { childImageSharp: { fluid: FluidObject } }
  }>(deviceColorsImageQuery);
  
  const blackSources = useMemo(() => [
    black.childImageSharp.fluid,
    { ...blackMobile.childImageSharp.fluid, media: '(max-width: 600px)' },
  ], [black, blackMobile]);
  
  const whiteSources = useMemo(() => [
    white.childImageSharp.fluid,
    { ...whiteMobile.childImageSharp.fluid, media: '(max-width: 600px)' },
  ], [white, whiteMobile]);
  
  useScrollmagicEffect((controller, Scene) => {
    new Scene({
      triggerElement: containerRef.current!,
      duration: DURATION,
    })
      .on('progress', (e: { progress: number }) => {
        const progress = Math.max(e.progress - 0.2, 0);
        
        // Minimize rerender by using refs and updating imperatively
        const transition = Math.max(0, Math.min((progress - 0.4) / 0.2, 1));
        blackRef.current!.style.opacity = (1 - transition).toFixed(2);
        whiteRef.current!.style.opacity = transition.toFixed(2);
        
        blackTextRef.current!.style.opacity = (1 - transition).toFixed(2);
        blackDotRef.current!.style.borderColor = `rgba(229, 229, 229, ${(1 - transition).toFixed(2)})`;
        whiteTextRef.current!.style.opacity = transition.toFixed(2);
        whiteDotRef.current!.style.borderColor = `rgba(229, 229, 229, ${transition.toFixed(2)})`;
      })
      .addTo(controller);
  });
  
  const scrollToBlack = () => {
    window.scrollTo({
      top: containerRef.current!.offsetTop,
      behavior: 'smooth'
    });
  };
  
  const scrollToWhite = () => {
    window.scrollTo({
      top: containerRef.current!.offsetTop + (window.innerHeight + DURATION) / 2,
      behavior: 'smooth'
    });
  };
  
  return (
    <DeviceColorsContainer ref={containerRef} style={{ height: `calc(${DURATION}px + 100vh)` }}>
      <PinnedItem duration={DURATION}>
        <Background ref={whiteRef}>
          <BackgroundImage fluid={whiteSources} objectFit="cover" />
        </Background>
        <Background ref={blackRef}>
          <BackgroundImage fluid={blackSources} objectFit="cover" />
        </Background>
        
        <TextContainer ref={floatRef}>
          <WhiteTextContainer ref={whiteTextRef}>
            <SubTitle>만나보세요</SubTitle>
            <Title>심플한 화이트로도</Title>
          </WhiteTextContainer>
          <BlackTextContainer ref={blackTextRef}>
            <SubTitle>컬러는</SubTitle>
            <Title>클래식한 블랙</Title>
          </BlackTextContainer>
          
          <ColorsContainer>
            <ColorDot ref={blackDotRef} type="button" onClick={scrollToBlack} style={{ backgroundColor: '#000000' }} />
            <ColorDot ref={whiteDotRef} type="button" onClick={scrollToWhite} style={{ backgroundColor: '#ffffff' }} />
          </ColorsContainer>
        </TextContainer>
      </PinnedItem>
    </DeviceColorsContainer>
  );
};
