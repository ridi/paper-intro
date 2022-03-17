import styled from 'astroturf'
import { graphql, useStaticQuery } from 'gatsby';
import { useFloatText } from '@/components/ridipaper4/hooks/useFloatText';
import { useRef } from 'react';
import Img from 'gatsby-image';
import React from 'react';
import { FluidObject } from 'gatsby-image';

const buttonImagesQuery = graphql`
  query ButtonImagesQuery {
    buttonDetails: file(relativePath: {eq: "images/ridipaper4/design/button-details.png"}) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    
    buttonLifestyleCut: file(relativePath: {eq: "images/ridipaper4/design/button-lifestylecut.png"}) {
      childImageSharp {
        fluid(maxWidth: 750, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

const DesignContainer = styled('section')`
  padding-top: 156px;
  padding-bottom: 178px;
`;

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Trigger = styled('div')`
  width: 100%;
  height: 0;
`;

const PrimaryTitle = styled('h2')`
  color: #000000;
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  text-align: center;
`;

const PrimaryDescription = styled('p')`
  margin-top: 34px;
  padding: 0 20px;
  color: #555555;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
`;

const DecoratorLine = styled('hr')`
  border: none;
  width: 1px;
  height: 123px;
  margin: 0 auto;
  margin-top: 75px;
  background: #000000;
`;

const SecondaryTitle = styled('h3')`
  margin-top: 80px;
  color: #000000;
  font-size: 28px;
  line-height: 37px;
  text-align: center;
`;

const SecondaryDescription = styled('p')`
  margin-top: 19px;
  color: #121212;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  opacity: .6;
`;

const TextFragment = styled('span')`
  display: inline-block;
`;

const ButtonDetailsImageContainer = styled('div')`
  position: relative;
  max-width: 1000px;
  margin: -16% auto;
  z-index: -1;
`;

const ButtonLifestyleCutImageContainer = styled('div')`
  position: relative;
  max-width: 750px;
  margin: 0 auto;
  margin-top: 67px;
  border-radius: 26px;
  overflow: hidden;
`;

const PRIMARY_TEXT_FLOAT_OPTIONS = {
  duration: '30%',
  hook: 0.7,
  height: 20
};

const SECONDARY_TEXT_FLOAT_OPTIONS = {
  duration: '30%',
  hook: 0.7,
  height: 20
};

export const Design = (): JSX.Element => {
  const primaryTriggerRef = useRef<HTMLDivElement>(null);
  const secondaryTriggerRef = useRef<HTMLDivElement>(null);
  const primaryFloatRef = useFloatText<HTMLDivElement>(primaryTriggerRef, PRIMARY_TEXT_FLOAT_OPTIONS);
  const secondaryFloatRef = useFloatText<HTMLDivElement>(secondaryTriggerRef, SECONDARY_TEXT_FLOAT_OPTIONS);
  
  const { buttonDetails, buttonLifestyleCut } = useStaticQuery<{
    buttonDetails: { childImageSharp: { fluid: FluidObject } }
    buttonLifestyleCut: { childImageSharp: { fluid: FluidObject } }
  }>(buttonImagesQuery);
  
  return (
    <DesignContainer>
      <Trigger ref={primaryTriggerRef} />
      <TextContainer ref={primaryFloatRef}>
        <PrimaryTitle>감각적인 간결함을 드러내다</PrimaryTitle>
        <PrimaryDescription>
          <TextFragment>시간과 공간을 간결하게 채우는 당신,</TextFragment>
          {' '}
          <TextFragment>일상을 만드는 가장 당신다운 삶의 방식이니까</TextFragment>
          <br />
          <TextFragment>미니멀 디자인의 RIDIPAPER 4는 시간, 공간,</TextFragment>
          {' '}
          <TextFragment>그리고 당신의 감각까지 그대로 반영합니다.</TextFragment>
        </PrimaryDescription>
      </TextContainer>
      
      <DecoratorLine />
      
      <ButtonDetailsImageContainer>
        <Img fluid={buttonDetails.childImageSharp.fluid} />
      </ButtonDetailsImageContainer>
      
      <Trigger ref={secondaryTriggerRef} />
      <TextContainer ref={secondaryFloatRef}>
        <SecondaryTitle>
          인체공학적으로
          <br />
          새롭게 조형된 버튼
        </SecondaryTitle>
        <SecondaryDescription>
          <TextFragment>첫 페이지부터 마지막 페이지까지</TextFragment>
          {' '}
          <TextFragment>기분좋게 눌리도록 설계된 9.5mm의</TextFragment>
          <br />
          <TextFragment>원형 버튼. 몇 시간을 들고 있어도</TextFragment>
          {' '}
          <TextFragment>편하게 쥘 수 있도록 남겨놓은 여백.</TextFragment>
        </SecondaryDescription>
      </TextContainer>
      
      <ButtonLifestyleCutImageContainer>
        <Img fluid={buttonLifestyleCut.childImageSharp.fluid} />
      </ButtonLifestyleCutImageContainer>
    </DesignContainer>
  );
}
