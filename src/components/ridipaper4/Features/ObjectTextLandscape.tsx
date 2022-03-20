import '@/fonts/RidiBatang';

import styled from 'astroturf';
import { chunkTextByWidth } from '@/utils/chunkTextByWidth';
import { useContext, useEffect, useRef } from 'react';
import * as constants from './constants';

import React from 'react';
import { TimelineContext } from './TimelineContext';

const ObjectTextLandscapeContainer = styled('div')`
  position: absolute;
  top: 49%;
  left: 46.4%;
  width: 59%;
  height: 44%;
  overflow: hidden;

  display: flex;
  transform: translate(-50%, -50%) rotate(-90deg);
  opacity: 0;
`;

const ObjectTextLandscapeColumn = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
`;

const LINE_HEIGHT = 1.9;
const FONT_SIZE = 28;
const ObjectTextLandscapeSvg = styled('svg')`
  width: 100%;
  font-size: ${FONT_SIZE}px;
  font-family: RIDIBatang, serif;
  line-height: ${LINE_HEIGHT}em;
`;

const TEXT_COLUMNS = (() => {
  const maxLines = Math.floor(
    (2 * constants.BASE_HEIGHT) / (FONT_SIZE * LINE_HEIGHT),
  );
  const lines = chunkTextByWidth(
    constants.PREVIEW_TEXT,
    FONT_SIZE,
    constants.BASE_WIDTH,
    maxLines,
  );
  const splitIndex = Math.ceil(maxLines / 2);
  return [lines.slice(0, splitIndex), lines.slice(splitIndex)];
})();

export const ObjectTextLandscape = (): JSX.Element => {
  const timeline = useContext(TimelineContext);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    timeline.subscribe('TextLandscape/Opacity', value => {
      textRef.current!.style.opacity = String(value);
    });

    return () => {
      timeline.unsubscribe('TextLandscape/Opacity');
    };
  }, []);

  return (
    <ObjectTextLandscapeContainer ref={textRef}>
      {TEXT_COLUMNS.map((lines, columnIndex) => (
        <ObjectTextLandscapeColumn key={columnIndex}>
          {lines.map((line, index) => (
            <ObjectTextLandscapeSvg
              key={index}
              viewBox={`0 0 ${constants.BASE_WIDTH} ${FONT_SIZE * LINE_HEIGHT}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <text x="0" y={FONT_SIZE * (LINE_HEIGHT / 2)}>
                {line}
              </text>
            </ObjectTextLandscapeSvg>
          ))}
        </ObjectTextLandscapeColumn>
      ))}
    </ObjectTextLandscapeContainer>
  );
};
