import styled from 'astroturf';
import { useCallback, useEffect, useState } from 'react';
import { BreakPoint } from '@/styles/media';
import { GalleryController as GalleryControllerType } from '../types';
import { GalleryFlowController } from './GalleryFlowController';
import { GalleryScrollController } from './GalleryScrollController';
import { PointerEvent } from 'react';

const GalleryControllerContainer = styled('div')`
  display: flex;
`;

export const GalleryController: GalleryControllerType = ({ images }): JSX.Element => {
  const [status, setStatus] = useState<'mobile' | 'desktop' | null>(null);
  useEffect(() => {
    const onResize = () => {
      setStatus(window.innerWidth < BreakPoint.DesktopMin ? 'mobile' : 'desktop');
    };
    onResize();
    
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  
  const onPointerEvent = useCallback((event: PointerEvent) => {
    setStatus(event.pointerType === 'touch' ? 'mobile' : 'desktop');
  }, []);
  
  const GalleryControllerInner = status === 'mobile'
    ? GalleryScrollController
    : GalleryFlowController;
  
  return (
    <GalleryControllerContainer onPointerDown={onPointerEvent}>
      <GalleryControllerInner images={images} />
    </GalleryControllerContainer>
  );
};
