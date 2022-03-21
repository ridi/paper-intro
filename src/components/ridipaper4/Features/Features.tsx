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

const OverflowBlock = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeaturesStage = styled('div')`
  position: absolute;
  width: 140vw;
  max-width: 100vh;
  margin-bottom: 15vh;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }
  
  @media (min-width: 601px) {
    position: relative;
    width: 90vw;
    max-width: 90vh;
    margin-top: 15vh;
    margin-bottom: 0;
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
          <OverflowBlock>
            <FeaturesStage>
              <ObjectBook/>
              <ObjectRidiPaper>
                <ObjectTextBackground aria-hidden="true" />
                <ObjectTextLandscape aria-hidden="true" />
              </ObjectRidiPaper>
              <ObjectText aria-hidden="true" />
              <ObjectSizeUI />
              <ObjectTouch />
            </FeaturesStage>
            
            <ObjectTitle />
          </OverflowBlock>
        </PinnedItem>
      </FeaturesContainer>
    </TimelineContextProvider>
  );
};
