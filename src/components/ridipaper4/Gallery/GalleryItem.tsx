import styled from 'astroturf';
import { forwardRef } from 'react';
import * as constants from './constants';

import Img from 'gatsby-image';
import { GalleryImage } from './types';

const GalleryItemContainer = styled('li')`
  width: ${constants.DESKTOP_WIDTH}px;
  height: 100%;
  padding: 0 14px;
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
