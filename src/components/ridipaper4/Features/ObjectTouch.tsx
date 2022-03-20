import styled from 'astroturf';
import { useContext, useEffect, useRef, useState } from 'react';

import React from 'react';
import { TimelineContext } from './TimelineContext';

const ObjectTouchContainer = styled('div')`
  position: absolute;
  width: 100%;
  top: 100%;
  opacity: 0;

  display: flex;
  justify-content: center;
  padding-right: 12%;
`;

const ObjectTouchIndicator = styled('div')`
  width: 5%;
  margin: 0 5%;
  background: #4aa0ed;
  border-radius: 100%;
  transition: transform 0.4s ease;

  &::after {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }

  &[data-is-touching='true'] {
    transform: scale(1.1);
  }

  &[data-is-scale='true'] {
    margin-left: 36.3%;
    margin-right: 0;
  }
`;

export const ObjectTouch = (): JSX.Element => {
  const timeline = useContext(TimelineContext);
  const touchRef = useRef<HTMLDivElement | null>(null);

  type TouchMode = 'one' | 'two' | 'scale';
  const [mode, setMode] = useState<TouchMode>('one');

  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    timeline.subscribe('Touch/Opacity', value => {
      touchRef.current!.style.opacity = String(value);
    });

    timeline.subscribe('Touch/Y', value => {
      touchRef.current!.style.top = `${value}%`;
    });

    timeline.subscribe('Touch/Touch', value => {
      setIsTouching(value === 'true');
    });

    timeline.subscribe('Touch/Mode', value => {
      setMode(value as TouchMode);
    });

    return () => {
      timeline.unsubscribe('Touch/Opacity');
      timeline.unsubscribe('Touch/Y');
      timeline.unsubscribe('Touch/Touch');
      timeline.unsubscribe('Touch/Mode');
    };
  }, []);
  return (
    <ObjectTouchContainer ref={touchRef}>
      <ObjectTouchIndicator
        data-is-touching={isTouching}
        data-is-scale={mode === 'scale'}
      />

      {mode === 'two' && <ObjectTouchIndicator data-is-touching={isTouching} />}
    </ObjectTouchContainer>
  );
};
