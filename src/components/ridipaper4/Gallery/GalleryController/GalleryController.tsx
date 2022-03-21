import styled from 'astroturf';
import { useEffect, useState } from 'react';
import React from 'react';
import { GalleryController as GalleryControllerType } from '../types';
import { GalleryFlowController } from './GalleryFlowController';
import { GalleryScrollController } from './GalleryScrollController';

const GalleryControllerContainer = styled('div')`
  display: flex;
  height: 100%;
  margin: 0 auto;
`;

export const GalleryController: GalleryControllerType = ({ images }): JSX.Element => {
  const [status, setStatus] = useState<'mobile' | 'desktop' | null>(null);
  useEffect(() => {
    const onResize = () => {
      setStatus(window.innerWidth <= 600 ? 'mobile' : 'desktop');
    };
    onResize();
    
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  
  /* const onPointerEvent = useCallback((event: PointerEvent) => {
    setStatus(event.pointerType === 'touch' ? 'mobile' : 'desktop');
  }, []); */
  
  const GalleryControllerInner = status === 'mobile'
    ? GalleryScrollController
    : GalleryFlowController;
  
  return (
    <GalleryControllerContainer>
      <GalleryControllerInner images={images} />
    </GalleryControllerContainer>
  );
};
