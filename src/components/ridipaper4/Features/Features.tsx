import styled from 'astroturf';
import { createTimeline } from '@/utils/animation';
import { useMemo, useRef } from 'react';
import { useScrollmagicEffect } from '@/components/ridipaper4/RidiPaper4ScrollmagicContext';
import React from 'react';
import { ObjectBook } from './ObjectBook';
import { ObjectRidiPaper } from './ObjectRidiPaper';
import { ObjectSizeUI } from './ObjectSizeUI';
import { ObjectText } from './ObjectText';
import { ObjectTextBackground } from './ObjectTextBackground';
import { ObjectTextLandscape } from './ObjectTextLandscape';
import { ObjectTitle } from './ObjectTitle';
import { ObjectTouch } from './ObjectTouch';
import { PinnedItem } from '@/components/ridipaper4/PinnedItem';
import { TimelineContextProvider } from './TimelineContext';

import {
  AnimationBrightness,
  AnimationEInk,
  AnimationInit,
  AnimationScale,
  AnimationTemperature,
  AnimationTransition,
  AnimationVertical
} from './animations';

export const FeaturesContainer = styled('section')`
  position: relative;
`;

const FeaturesStage = styled('div')`
  position: relative;
  width: 100vw;
  max-width: 100vh;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }
  
  @media (min-width: 601px) {
    width: 70vw;
    max-width: 90vh;
    margin-top: 5vh;
  }
`;

const animations = [
  AnimationInit('어느 방향이든 쾌적하게'),
  AnimationVertical,
  AnimationTransition('종이책을 보던 느낌 그대로\n전자잉크 디스플레이'),
  AnimationEInk,
  AnimationTransition('한 손가락으로는 밝기조절'),
  AnimationBrightness,
  AnimationTransition('두 손가락으로는 색온도조절'),
  AnimationTemperature,
  AnimationTransition('마음대로 디자인하는 페이지'),
  AnimationScale,
];

const DURATION = 10000;
export const Features = (): JSX.Element => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeline = useMemo(() => createTimeline(animations), []);
  useScrollmagicEffect((controller, Scene) => {
    new Scene({
      triggerElement: triggerRef.current!,
      duration: DURATION,
    })
      .on('progress', (e: { progress: number }) => timeline.update(e.progress))
      .addTo(controller);
  }, [timeline]);
  
  return (
    <TimelineContextProvider value={timeline}>
      <FeaturesContainer style={{ height: `calc(${DURATION}px + 100vh)` }} ref={triggerRef}>
        <PinnedItem duration={DURATION}>
          <FeaturesStage aria-hidden="true">
            <ObjectBook/>
            <ObjectRidiPaper>
              <ObjectTextBackground />
              <ObjectTextLandscape />
            </ObjectRidiPaper>
            <ObjectText />
            <ObjectSizeUI />
            <ObjectTouch />
            <ObjectTitle />
          </FeaturesStage>
        </PinnedItem>
      </FeaturesContainer>
    </TimelineContextProvider>
  );
};
