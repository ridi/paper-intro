import styled from 'astroturf';
import { useContext, useEffect, useRef } from 'react';
import React from 'react';
import { TimelineContext } from './TimelineContext';

const ObjectTextBackgroundContainer = styled('div')`
  position: absolute;
  top: 49.95%;
  left: 45.4%;
  transform: translate(-50%, -50%);
  width: 46.15%;
  height: 61.4%;
  background: #c8cccd;
  border-radius: 0.5%;
`;

export const ObjectTextBackground = (): JSX.Element => {
  const timeline = useContext(TimelineContext);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let hue = 29;
    let saturation = 0;
    let luma = 79;

    timeline.subscribe('TextBackground/Brightness', value => {
      luma = value;
      backgroundRef.current!.style.background = `hsl(${hue}, ${saturation}%, ${luma}%)`;
    });

    timeline.subscribe('TextBackground/Temperature', value => {
      saturation = value;
      backgroundRef.current!.style.background = `hsl(${hue}, ${saturation}%, ${luma}%)`;
    });

    return () => {
      timeline.unsubscribe('TextBackground/Brightness');
      timeline.unsubscribe('TextBackground/Temperature');
    };
  }, []);

  return <ObjectTextBackgroundContainer ref={backgroundRef} />;
};
