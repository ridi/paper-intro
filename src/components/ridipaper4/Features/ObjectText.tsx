import '@/fonts/RidiBatang';

import styled from 'astroturf';
import { chunkTextByWidth } from '@/utils/chunkTextByWidth';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as constants from './constants';

import React from 'react';
import { TimelineContext } from './TimelineContext';

const TEXT_SIZE_MAP: Record<string, number> = {
  'size-5': 20,
  'size-6': 24,
  'size-7': 30,
  'size-8': 36,
};

const ObjectTextContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 46.4%;
  transform: translate(-50%, -50%);
  transform-origin: 56% 49%;
  width: 44%;
  height: 59%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
`;

const LINE_HEIGHT = 1.9;
const ObjectTextSvg = styled('svg')`
  font-family: RIDIBatang, serif;
  line-height: ${LINE_HEIGHT}em;
  user-select: none;
`;

export const ObjectText = (): JSX.Element => {
  const timeline = useContext(TimelineContext);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [textSize, setTextSize] = useState('size-5');

  useEffect(() => {
    timeline.subscribe('Text/Opacity', value => {
      textRef.current!.style.opacity = String(value);
    });

    timeline.subscribe('Text/Size', value => {
      setTextSize(value);
    });

    timeline.subscribe('Text/Rotation', value => {
      textRef.current!.style.transform = `translate(-50%, -50%) rotate(${value}deg)`;
    });

    return () => {
      timeline.unsubscribe('Text/Opacity');
      timeline.unsubscribe('Text/Size');
      timeline.unsubscribe('Text/Rotation');
    };
  }, []);

  const fontSize = TEXT_SIZE_MAP[textSize];
  const lines = useMemo(() => {
    const maxLines = Math.floor(
      constants.BASE_HEIGHT / (fontSize * LINE_HEIGHT),
    );
    return chunkTextByWidth(
      constants.PREVIEW_TEXT,
      fontSize,
      constants.BASE_WIDTH + 5,
      maxLines,
    );
  }, [fontSize]);

  return (
    <ObjectTextContainer ref={textRef} data-size={textSize}>
      {lines.map((line, index) => (
        <ObjectTextSvg
          key={index}
          viewBox={`0 0 ${constants.BASE_WIDTH} ${fontSize * LINE_HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ fontSize: `${fontSize}px` }}
        >
          <text x="0" y={fontSize * (LINE_HEIGHT / 2)}>
            {line}
          </text>
        </ObjectTextSvg>
      ))}
    </ObjectTextContainer>
  );
};
