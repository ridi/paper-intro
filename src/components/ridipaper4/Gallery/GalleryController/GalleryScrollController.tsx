import styled from 'astroturf';
import { GalleryController } from '../types';
import { GalleryItem } from '../GalleryItem';

const GalleryScrollContainer = styled('ul')`
  max-width: 100%;
  overflow: auto;
  
  display: flex;
  margin: 0 -5px;
`;

const GalleryScrollItem = styled(GalleryItem)`
  flex: 0 0 auto;
  margin: 0 5px;
`;

export const GalleryScrollController: GalleryController = ({ images }) => (
  <GalleryScrollContainer>
    { images.map(image => (
      <GalleryScrollItem image={image} />
    )) }
  </GalleryScrollContainer>
);
