import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import IconVideoPlayback from '@/svgs/ridipaper4/video-playback.inline.svg';
import Img from 'gatsby-image';
import { ComponentType } from 'react';
import { FluidObject } from 'gatsby-image';
import { LineBreakOnDesktop, LineBreakOnMobile } from '@/components/ridipaper4/LineBreak';

const VideoContainer = styled('section')`
  padding: 135px 0;
  
  @media (max-width: 600px) {
    padding: 37px 0;
  }
`;

const Title = styled('h2')`
  color: #000000;
  font-size: 36px;
  font-weight: 700;
  line-height: 58px;
  
  @media (max-width: 600px) {
    font-size: 24px;
    line-height: 31px;
  }
`;

const Description = styled('p')`
  margin-top: 15px;
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  opacity: .6;
  text-align: center;
  
  @media (max-width: 600px) {
    font-size: 10px;
    line-height: 16px;
  }
`;

const VideoThumbnailContainer = styled('div')`
  cursor: pointer;
  position: relative;
  width: 80vw;
  max-width: 1500px;
  margin: 0 auto;
  margin-top: 92px;
  
  @media (max-width: 600px) {
    height: 450px;
    margin-top: 32px;
  }
`;

const VideoThumbnailImage = styled(Img)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 600px) {
    height: 100%;
  }
` as ComponentType<{ fluid: FluidObject }>;

const VideoThumbnailIcon = styled(IconVideoPlayback)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 90px;
  transform: translate(-50%, -50%);
  
  @media (max-width: 600px) {
    width: 48px;
    height: 48px;
  }
`;

const videoStillCutImageQuery = graphql`
  query VideoStillCutImageQuery {
    stillCut: file(relativePath: {eq: "images/ridipaper4/video/video-stillcut.png"}) {
      childImageSharp {
        fluid(maxWidth: 1500, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

export const Video = (): JSX.Element => {
  const { stillCut } = useStaticQuery<{
    stillCut: { childImageSharp: { fluid: FluidObject } }
  }>(videoStillCutImageQuery);
  
  return (
    <VideoContainer>
      <Title>
        Simple living with{' '}
        <LineBreakOnMobile />
        RIDIPAPER 4
      </Title>
      <Description>
        출근길 지하철, 여행 떠나는 비행기 안, 잠들기 전 침대 위{' '}
        <LineBreakOnMobile />
        어디서든 책을 읽고 싶은 순간{' '}
        <LineBreakOnDesktop />
        RIDIPAPER를 꺼내보세요.{' '}
        <LineBreakOnMobile />
        내가 있는 모든 곳이 독서하기 가장 좋은 곳이 됩니다.
      </Description>
      <VideoThumbnailContainer>
        <VideoThumbnailImage fluid={stillCut.childImageSharp.fluid} />
        <VideoThumbnailIcon />
      </VideoThumbnailContainer>
    </VideoContainer>
  );
};
