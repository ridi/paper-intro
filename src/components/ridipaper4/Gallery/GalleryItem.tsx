import styled from 'astroturf';
import { forwardRef } from 'react';
import Img from 'gatsby-image';
import React from 'react';
import { GalleryImage } from './types';

const GalleryItemContainer = styled('li')`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  list-style-type: none;
`;

type GalleryItemProps = {
  image: GalleryImage;
  className?: string;
};

export const GalleryItem = forwardRef<HTMLLIElement, GalleryItemProps>(({ image, className }, ref) => {
  return (
    <GalleryItemContainer className={className} ref={ref}>
      <Img fluid={image.fluid} />
    </GalleryItemContainer>
  );
});
