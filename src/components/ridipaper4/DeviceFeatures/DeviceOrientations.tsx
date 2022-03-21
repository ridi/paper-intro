import styled from 'astroturf';
import { chunkTextByWidth } from '@/utils/chunkTextByWidth';
import { graphql, useStaticQuery } from 'gatsby';
import { useFloatText } from '@/components/ridipaper4/hooks/useFloatText';
import { useRef } from 'react';
import { useScrollmagicEffect } from '@/components/ridipaper4/RidiPaper4ScrollmagicContext';
import * as constants from './constants';

import Img from 'gatsby-image/withIEPolyfill';
import React from 'react';
import { ComponentType } from 'react';
import { FluidObject } from 'gatsby-image';
import { PinnedItem } from '@/components/ridipaper4/PinnedItem';

const deviceOrientationsImageQuery = graphql`
  query DeviceOrientationsImageQuery {
    ridipaper: file(relativePath: { eq: "images/ridipaper4/device-features/ridipaper4.png" }) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    
    text: file(relativePath: { eq: "images/ridipaper4/device-features/text.png" }) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

const DeviceOrientationsContainer = styled('div')`
  position: relative;
  height: 100vh;
`;

const DeviceOrientationsStage = styled('div')`
  position: absolute;
  right: 20%;
  width: 40vw;
  max-width: 60vh;

  &::after {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }

  @media (max-width: 800px) {
    width: 60vw;
    right: 0%;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 30%;
    left: 50%;
    transform: translate(-50%);
  }
`;

const RidiPaperContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 46.4% 50%;
  width: 100%;
  height: 100%;
  opacity: 1;

  @media (max-width: 800px) {
    transform-origin: 50% 50%;
  }
  transition: transform .4s ease;
`;

const RidiPaperImage = styled(Img)`
  width: 100%;
  height: 100%;
` as ComponentType<{ fluid: FluidObject; objectFit: 'cover' | 'contain' }>;

const PreviewTextContainer = styled('div')`
  position: absolute;
  top: 51%;
  left: 50%;
  width: 130%;
  height: 130%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 1;
  transition: opacity .4s ease .4s;
`;

const PreviewTextContainerReverse = styled(PreviewTextContainer)`
  transform: translate(-50%, -50%) rotate(180deg);
  transform-origin: 45.4% 49%;
  opacity: 0;
`;

const PreviewTextImage = styled(Img)`
  width: 100%;
  height: 100%;
` as ComponentType<{ fluid: FluidObject; objectFit: 'cover' | 'contain' }>;

const SubTitle = styled('span')`
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
`;

const Title = styled('h2')`
  margin-top: 6px;
  color: #000000;
  font-size: 28px;
  line-height: 37px;
  font-weight: 700;
  text-align: start;
`;

const TextContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(0, -50%);
  opacity: 0;

  @media (max-width: 800px) {
    left: 15%;
  }

  @media (max-width: 600px) {
    top: 20%;
    left: 10%;
  }
`;

const OverflowBlock = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DURATION = 2000;
export const DeviceOrientations = (): JSX.Element => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const previewTextRef = useRef<HTMLDivElement>(null);
  const previewTextReverseRef = useRef<HTMLDivElement>(null);
  const ridipaperRef = useRef<HTMLDivElement>(null);

  const floatRef = useFloatText<HTMLDivElement>(triggerRef, {
    ...constants.TEXT_FLOAT_OPTIONS,
    additionalTransform: 'translate(0, -50%)',
  });

  const { ridipaper, text } = useStaticQuery<{
    ridipaper: { childImageSharp: { fluid: FluidObject } };
    text: { childImageSharp: { fluid: FluidObject } };
  }>(deviceOrientationsImageQuery);

  useScrollmagicEffect((controller, Scene) => {
    new Scene({
      triggerElement: triggerRef.current!,
      duration: DURATION,
      offset: DURATION * 0.2,
    })
      .on('progress', (e: { progress: number }) => {
        // const transition = Math.min(e.progress / 0.9, 1);
        const transition = e.progress < 0.45 ? 0 : 1;
        
        const rotationTransition = Math.min(transition / 0.45, 1);
        const textTransition = Math.max(
          0,
          Math.min((transition - 0.45) / 0.3, 1),
        );
        ridipaperRef.current!.style.transform = `translate(-50%, -50%) rotate(${(
          180 * rotationTransition
        ).toFixed(2)}deg)`;
        previewTextRef.current!.style.opacity = (1 - textTransition).toFixed(2);
        previewTextReverseRef.current!.style.opacity = textTransition.toFixed(
          2,
        );
      })
      .addTo(controller);
  });

  return (
    <DeviceOrientationsContainer
      ref={triggerRef}
      style={{ height: `calc(${DURATION}px + 100vh)` }}
    >
      <PinnedItem duration={DURATION}>
        <OverflowBlock>
          <DeviceOrientationsStage>
            <RidiPaperContainer ref={ridipaperRef}>
              <RidiPaperImage fluid={ridipaper.childImageSharp.fluid} objectFit="cover" />

              <PreviewTextContainer ref={previewTextRef}>
                <PreviewTextImage fluid={text.childImageSharp.fluid} objectFit="cover" />
              </PreviewTextContainer>

              <PreviewTextContainerReverse ref={previewTextReverseRef}>
                <PreviewTextImage fluid={text.childImageSharp.fluid} objectFit="cover" />
              </PreviewTextContainerReverse>
            </RidiPaperContainer>
          </DeviceOrientationsStage>
        </OverflowBlock>

        <TextContainer ref={floatRef}>
          <SubTitle>누구나 쉽게 편하게</SubTitle>
          <Title>
            어느 손으로든
            <br />
            편안하게
          </Title>
        </TextContainer>
      </PinnedItem>
    </DeviceOrientationsContainer>
  );
};
