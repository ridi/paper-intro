import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useFloatText } from '@/components/ridipaper4/hooks/useFloatText';
import { useMemo, useRef } from 'react';
import * as constants from './constants';

import Img from 'gatsby-image/withIEPolyfill';
import React from 'react';
import { ComponentType } from 'react';
import { FluidObject } from 'gatsby-image';

const deviceWaterproofImageQuery = graphql`
  query DeviceWaterproofImageQuery {
    waterproof: file(relativePath: {eq: "images/ridipaper4/device-features/waterproof.png"}) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    
    waterproofMobile: file(relativePath: {eq: "images/ridipaper4/device-features/waterproof-mobile.png"}) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

const DeviceWaterproofContainer = styled('div')`
  position: relative;
  height: 100vh;
`;

const Background = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const BackgroundImage = styled(Img)`
  width: 100%;
  height: 100%;
` as ComponentType<{ fluid: FluidObject[], objectFit: 'cover' | 'contain' }>;

const SubTitle = styled('span')`
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-transform: uppercase;
`;

const Title = styled('h2')`
  margin-top: 6px;
  color: #000000;
  font-size: 28px;
  font-weight: 700;
  text-align: start;
  line-height: 38px;
  
  @media (max-width: 600px) {
    text-align: center;
  }
`;

const Description = styled('p')`
  margin-top: 20px;
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  
  @media (max-width: 600px) {
    text-align: center;
  }
`;

const TextContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(0, -50%);
  opacity: 0;
  
  @media (max-width: 600px) {
    left: 5%;
    width: 90%;
    text-align: center;
  }
`;

export const DeviceWaterproof = (): JSX.Element => {
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const { waterproof, waterproofMobile } = useStaticQuery<{
    waterproof: { childImageSharp: { fluid: FluidObject } }
    waterproofMobile: { childImageSharp: { fluid: FluidObject } }
  }>(deviceWaterproofImageQuery);
  
  const sources = useMemo(() => [
    waterproof.childImageSharp.fluid,
    {
      ...waterproofMobile.childImageSharp.fluid,
      media: '(max-width: 600px)',
    },
  ], [waterproof, waterproofMobile]);
  
  const floatRef = useFloatText<HTMLDivElement>(
    triggerRef,
    { ...constants.TEXT_FLOAT_OPTIONS, additionalTransform: 'translate(0, -50%)' }
  );
  
  return (
    <DeviceWaterproofContainer ref={triggerRef}>
      <Background>
        <BackgroundImage fluid={sources} objectFit="cover" />
      </Background>
      
      <TextContainer ref={floatRef}>
        <SubTitle>Water Proof</SubTitle>
        <Title>국내 최초 방수</Title>
        <Description>
          가장 개인적인 공간에서도
          <br />
          여유롭고 느긋하게 즐길 수 있도록
          <br />
          IPX8 생활 방수 기능 탑재
        </Description>
      </TextContainer>
    </DeviceWaterproofContainer>
  );
};
