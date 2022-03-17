import styled from 'astroturf';
import { useContext, useEffect, useRef, useState } from 'react';
import React from 'react';
import { TimelineContext } from './TimelineContext';

const ObjectTitleText = styled('div')`
  position: absolute;
  top: 15%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5em;
  text-align: center;
  white-space: pre-line;
  
  
  @media (max-width: 600px) {
    top: unset;
    bottom: 10%;
    height: 1.8em;
    transform-origin: bottom;
  }
`;

export const ObjectTitle = (): JSX.Element => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const timeline = useContext(TimelineContext);
  const [text, setText] = useState('');
  
  useEffect(() => {
    timeline.subscribe('Title/Transition', (value) => {
      titleRef.current!.style.opacity = `${1 - Math.abs(value)}`;
      titleRef.current!.style.transform = `translate(-50%, calc(-50% + ${value * 10}px))`;
    });
    
    timeline.subscribe('Title/Text', (value) => {
      setText(value);
    });
    
    return () => {
      timeline.unsubscribe('Title/Transition');
      timeline.unsubscribe('Title/Text');
    };
  }, []);
  
  return (
    <ObjectTitleText ref={titleRef}>
      {text}
    </ObjectTitleText>
  );
};
