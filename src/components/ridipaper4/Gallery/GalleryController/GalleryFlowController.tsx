import styled from 'astroturf';
import { useAnimationFrame } from '../hooks';
import { useCallback, useMemo, useRef } from 'react';
import { GalleryController } from '../types';
import { GalleryItem } from '../GalleryItem';

const MAX_WIDTH = 1920;
const ITEM_VELOCITY = 0.03;

const GalleryFlowContainer = styled('ul')`
  max-width: ${MAX_WIDTH}px;
  overflow: hidden;
  
  display: flex;
  margin: 0 -14px;
`;

const GalleryFlowItem = styled(GalleryItem)`
  margin: 0 14px;
`;

export const GalleryFlowController: GalleryController = ({ images }) => {
  const itemPositions = useRef<Record<string, number>>({});
  const itemRefs = useRef<Record<string, HTMLLIElement>>({});
  const items = useMemo(() => images.map(image => ({
    ref: (itemRef: HTMLLIElement) => { itemRefs.current[image.key] = itemRef; },
    image,
  })), [images]);
  
  const lastAnimate = useRef(Date.now());
  const onAnimationFrame = useCallback(() => {
    const now = Date.now();
    const delta = now - lastAnimate.current;
    lastAnimate.current = now;
    
    images.forEach(({ key }) => {
      const itemRef = itemRefs.current[key];
      if (!itemRef)
        return;
      
      const itemPosition = itemPositions.current[key] ?? 0;
      const nextPosition = itemPosition - ITEM_VELOCITY * delta;
      const nextClampedPosition = ((nextPosition % MAX_WIDTH) + MAX_WIDTH) % MAX_WIDTH;
      itemPositions.current[key] = nextClampedPosition;
      
      itemRef.style.transform = `translate(${nextClampedPosition.toFixed(2)}px)`;
    });
  }, [images]);
  
  useAnimationFrame(onAnimationFrame);
  
  return (
    <GalleryFlowContainer>
      { items.map(({ image, ref }) => (
        <GalleryFlowItem image={image} ref={ref} />
      )) }
    </GalleryFlowContainer>
  );
}
