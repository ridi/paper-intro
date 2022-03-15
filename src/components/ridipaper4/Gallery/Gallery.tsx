import styled from 'astroturf';
import { useGalleryImages } from './hooks';
import * as constants from './constants';

import { BreakPoint } from '@/styles/media';
import { GalleryController } from './GalleryController';

const GalleryContainer = styled('section')`
  height: ${constants.DESKTOP_HEIGHT}px;
  
  @media (max-width: ${BreakPoint.MobileMax}px) {
    height: ${constants.MOBILE_HEIGHT}px;
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
