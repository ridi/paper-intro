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
    ridipaper: file(
      relativePath: { eq: "images/ridipaper4/device-features/ridipaper4.png" }
    ) {
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
    margin-top: 50%;
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
`;

const RidiPaperImage = styled(Img)`
  width: 100%;
  height: 100%;
` as ComponentType<{ fluid: FluidObject; objectFit: 'cover' | 'contain' }>;

const PreviewTextContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 70%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 1;
`;

const PreviewTextContainerReverse = styled(PreviewTextContainer)`
  transform: translate(-50%, -50%) rotate(180deg);
  transform-origin: 42% 50%;
  opacity: 0;
`;

const LINE_HEIGHT = 2;
const FONT_SIZE = 24;
const PreviewTextSvg = styled('svg')`
  font-family: RIDIBatang, serif;
  font-size: ${FONT_SIZE}px;
  line-height: ${LINE_HEIGHT}em;
  user-select: none;
`;

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

const BASE_WIDTH = 700;
const BASE_HEIGHT = 900;
const MAX_LINES = Math.floor(BASE_HEIGHT / (FONT_SIZE * LINE_HEIGHT));
const LINES = chunkTextByWidth(
  constants.PREVIEW_TEXT,
  FONT_SIZE,
  BASE_WIDTH + 5,
  MAX_LINES,
);

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

  const { ridipaper } = useStaticQuery<{
    ridipaper: { childImageSharp: { fluid: FluidObject } };
  }>(deviceOrientationsImageQuery);

  useScrollmagicEffect((controller, Scene) => {
    new Scene({
      triggerElement: triggerRef.current!,
      duration: DURATION,
      offset: DURATION * 0.2,
    })
      .on('progress', (e: { progress: number }) => {
        const transition = Math.min(e.progress / 0.9, 1);
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
              <RidiPaperImage
                fluid={ridipaper.childImageSharp.fluid}
                objectFit="cover"
              />

              <PreviewTextContainer ref={previewTextRef}>
                {LINES.map((line, index) => (
                  <PreviewTextSvg
                    key={index}
                    viewBox={`0 0 ${BASE_WIDTH} ${FONT_SIZE * LINE_HEIGHT}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <text x="0" y={FONT_SIZE * (LINE_HEIGHT / 2)}>
                      {line}
                    </text>
                  </PreviewTextSvg>
                ))}
              </PreviewTextContainer>

              <PreviewTextContainerReverse ref={previewTextReverseRef}>
                {LINES.map((line, index) => (
                  <PreviewTextSvg
                    key={index}
                    viewBox={`0 0 ${BASE_WIDTH} ${FONT_SIZE * LINE_HEIGHT}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <text x="0" y={FONT_SIZE * (LINE_HEIGHT / 2)}>
                      {line}
                    </text>
                  </PreviewTextSvg>
                ))}
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
