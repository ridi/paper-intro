import styled from 'astroturf';
import { useGalleryImages } from './hooks';
import React from 'react';
import { GalleryController } from './GalleryController';

const GalleryContainer = styled('section')`
  height: 456px;
  
  @media (max-width: 600px) {
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
