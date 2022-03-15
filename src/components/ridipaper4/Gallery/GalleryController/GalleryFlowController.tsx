import styled from 'astroturf';
import { useAnimationFrame } from '../hooks';
import { useCallback, useMemo, useRef } from 'react';
import React from 'react';
import { GalleryController } from '../types';
import { GalleryItem } from '../GalleryItem';

const MAX_WIDTH = 1920;
const ITEM_VELOCITY = 0.02;
const ITEM_WIDTH = 271;
const ITEM_HEIGHT = 456;
const ITEM_MARGIN = 14;
const ITEM_BOX = ITEM_WIDTH + ITEM_MARGIN;

const GalleryFlowContainer = styled('ul')`
  position: relative;
  display: flex;
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  overflow: hidden;
`;

const GalleryFlowItem = styled(GalleryItem)`
  position: absolute;
  left: 0;
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
`;

export const GalleryFlowController: GalleryController = ({ images }) => {
  const imagesFilled = useMemo(() =>
    Array
      .from({ length: Math.ceil(MAX_WIDTH / (images.length * ITEM_BOX)) })
      .flatMap((_, index) => images.map(image => ({ ...image, key: `${image.key}-${index}` }))),
    [images]
  );
  
  const itemPositions = useRef<Record<string, number>>({});
  const itemRefs = useRef<Record<string, HTMLLIElement>>({});
  const items = useMemo(() => imagesFilled.map(image => ({
    ref: (itemRef: HTMLLIElement) => { itemRefs.current[image.key] = itemRef; },
    image,
  })), [imagesFilled]);
  const lastItemKey = useRef<string>(items[items.length - 1].image.key);
  
  const lastAnimate = useRef(Date.now());
  const onAnimationFrame = useCallback(() => {
    const now = Date.now();
    const delta = now - lastAnimate.current;
    lastAnimate.current = now;
    
    imagesFilled.forEach(({ key }, index) => {
      const itemRef = itemRefs.current[key];
      if (!itemRef)
        return;
      
      const currentPosition = itemPositions.current[key] ?? ITEM_BOX * index;
      let nextPosition = currentPosition - ITEM_VELOCITY * delta;
      if (nextPosition < -ITEM_BOX) {
        nextPosition = itemPositions.current[lastItemKey.current] + ITEM_BOX;
        lastItemKey.current = key;
      }
      
      itemPositions.current[key] = nextPosition;
      itemRef.style.transform = `translate(${nextPosition.toFixed(2)}px)`;
    });
  }, [images]);
  
  useAnimationFrame(onAnimationFrame);
  
  return (
    <GalleryFlowContainer>
      { items.map(({ image, ref }) => (
        <GalleryFlowItem key={image.key} image={image} ref={ref} />
      )) }
    </GalleryFlowContainer>
  );
}
