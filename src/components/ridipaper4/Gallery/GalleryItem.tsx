import styled from 'astroturf';
import { forwardRef } from 'react';
import Img from 'gatsby-image';
import React from 'react';
import { ComponentType } from 'react';
import { FluidObject } from 'gatsby-image';
import { GalleryImage } from './types';
import { Link } from 'gatsby';

const GalleryItemContainer = styled('li')`
  list-style-type: none;
`;

const GalleryItemLink = styled(Link)`
  width: 100%;
  height: 100%;
`;

const GalleryItemImage = styled(Img)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
` as ComponentType<{ fluid: FluidObject }>;

type GalleryItemProps = {
  image: GalleryImage;
  className?: string;
};

export const GalleryItem = forwardRef<HTMLLIElement, GalleryItemProps>(({ image, className }, ref) => {
  return (
    <GalleryItemContainer className={className} ref={ref}>
      <GalleryItemLink to={`#gallery-${image.index}`}>
        <GalleryItemImage fluid={image.fluid} />
      </GalleryItemLink>
    </GalleryItemContainer>
  );
});
