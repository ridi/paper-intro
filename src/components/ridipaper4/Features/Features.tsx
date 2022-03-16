import styled from 'astroturf';
import { createTimeline } from '@/utils/animation';
import { useMemo, useRef } from 'react';
import { useScrollmagicEffect } from '@/components/ridipaper4/RidiPaper4ScrollmagicContext';
import React from 'react';
import { AnimationBrightness, AnimationEInk } from './animations';
import { ObjectBook } from './ObjectBook';
import { ObjectRidiPaper } from './ObjectRidiPaper';
import { TimelineContextProvider } from './TimelineContext';

export const FeaturesContainer = styled('section')`
  position: relative;
`;

const FeaturesTrigger = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const FeaturesPinTarget = styled('div')`
  position: sticky;
  top: 0;
  width: 100% !important;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FeaturesStage = styled('div')`
  position: relative;
  width: 80vh;
  width: 80vmin;
  max-width: 1024px;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }
`;

const animations = [
  AnimationBrightness,
  AnimationEInk,
];

const DURATION = 4500;
export const Features = (): JSX.Element => {
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeline = useMemo(() => createTimeline(animations), []);
  useScrollmagicEffect((controller, Scene) => {
    // IE Only
    const pinStyle = window.getComputedStyle(pinRef.current!);
    if (pinStyle.position !== 'sticky') {
      new Scene({
        triggerElement: triggerRef.current!,
        triggerHook: 'onLeave',
        duration: DURATION,
      })
        .setPin(pinRef.current!, {pushFollowers: false})
        .addTo(controller);
    }
    
    new Scene({
      triggerElement: triggerRef.current!,
      duration: DURATION,
    })
      .on('progress', (e: { progress: number }) => timeline.update(e.progress))
      .addTo(controller);
  }, [timeline]);
  
  return (
    <TimelineContextProvider value={timeline}>
      <FeaturesContainer style={{ height: `calc(${DURATION}px + 100vh)` }}>
        <FeaturesTrigger ref={triggerRef} />
        <FeaturesPinTarget ref={pinRef}>
          <FeaturesStage>
            <ObjectBook/>
            <ObjectRidiPaper />
          </FeaturesStage>
        </FeaturesPinTarget>
      </FeaturesContainer>
    </TimelineContextProvider>
  );
};
