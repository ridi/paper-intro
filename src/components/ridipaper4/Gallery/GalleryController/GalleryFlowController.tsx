import styled from 'astroturf';
import React from 'react';
import { GalleryController } from '../types';
import { GalleryItem } from '../GalleryItem';

const MAX_WIDTH = 1920;
const DURATION = 90;
const ITEM_WIDTH = 271;
const ITEM_HEIGHT = 456;

const GalleryFlowContainer = styled('div')`
  position: relative;
  display: flex;
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  overflow: hidden;
`;

const GalleryFlowFlow = styled('ul')`
  position: absolute;
  left: 0;
  
  display: flex;
  animation-name: GalleryFlowItem__flow;
  animation-duration: ${DURATION}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  @keyframes GalleryFlowItem__flow {
    0% {
      transform: translate(0);
    }
    
    50% {
      transform: translate(-100%);
    }
    
    50.00001% {
      transform: translate(100%);
    }
    
    100% {
      transform: translate(0);
    }
  }
`

const GalleryFlowFlowAlternate = styled('ul')`
  position: absolute;
  left: 0;

  display: flex;
  animation-name: GalleryFlowItem__flowAlternate;
  animation-duration: ${DURATION}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  @keyframes GalleryFlowItem__flowAlternate {
    0% {
      transform: translate(100%);
    }
    
    50% {
      transform: translate(0%);
    }
    
    100% {
      transform: translate(-100%);
    }
  }
`;

const GalleryFlowItem = styled(GalleryItem)`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  padding: 0 14px;
`;

export const GalleryFlowController: GalleryController = ({ images }) => {
  return (
    <GalleryFlowContainer>
      <GalleryFlowFlow>
        { images.map(image => (
          <GalleryFlowItem key={image.key} image={image} />
        )) }
      </GalleryFlowFlow>
      <GalleryFlowFlowAlternate>
        { images.map(image => (
          <GalleryFlowItem key={image.key} image={image} />
        )) }
      </GalleryFlowFlowAlternate>
    </GalleryFlowContainer>
  );
}
