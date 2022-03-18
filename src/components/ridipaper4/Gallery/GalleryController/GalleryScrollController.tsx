import styled from 'astroturf';
import React from 'react';
import { GalleryController } from '../types';
import { GalleryItem } from '../GalleryItem';

const GalleryScrollContainer = styled('ul')`
  max-width: 100%;
  padding: 0 10vw;
  overflow: auto;
  
  display: flex;
`;

const GalleryScrollItem = styled(GalleryItem)`
  width: 128px;
  flex: 0 0 auto;
  margin: 0 5px;
  
  &:first-of-type {
    margin-left: 0;
  }
  
  &:last-of-type {
    margin-right: 0;
  }
`;

export const GalleryScrollController: GalleryController = ({ images }) => (
  <GalleryScrollContainer>
    { images.map(image => (
      <GalleryScrollItem key={image.key} image={image} />
    )) }
  </GalleryScrollContainer>
);
