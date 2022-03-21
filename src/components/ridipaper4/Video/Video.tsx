import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';

import IconVideoPlayback from '@/svgs/ridipaper4/video-playback.inline.svg';
import Img from 'gatsby-image';
import React from 'react';
import { ComponentType } from 'react';
import { FluidObject } from 'gatsby-image';
import { LineBreakOnMobile } from '@/components/ridipaper4/LineBreak';
import { Link } from 'gatsby';
import { VideoLightbox } from './VideoLightbox';

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

const VideoThumbnailContainer = styled(Link)`
  display: block;
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
        Simple Living with{' '}
        <LineBreakOnMobile />
        RIDIPAPER 4
      </Title>
      <VideoThumbnailContainer to="#video">
        <VideoThumbnailImage fluid={stillCut.childImageSharp.fluid} />
        <VideoThumbnailIcon />
      </VideoThumbnailContainer>
      <VideoLightbox />
    </VideoContainer>
  );
};
