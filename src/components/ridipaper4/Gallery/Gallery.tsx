import styled from 'astroturf';
import { useGalleryImages } from './hooks';
import React from 'react';
import { GalleryController } from './GalleryController';

const GalleryContainer = styled('section')`
  box-sizing: content-box;
  padding: 135px 0;
  height: 456px;
  
  @media (max-width: 600px) {
    padding: 37px 0;
    height: 128px;
  }
`;

export const Gallery = (): JSX.Element => {
  const images = useGalleryImages();
  
  return (
    <GalleryContainer>
      <GalleryController images={images} />
    </GalleryContainer>
  );
};
