import styled from 'astroturf';
import { useRef } from 'react';
import { useScrollmagicEffect } from '@/components/ridipaper4/RidiPaper4ScrollmagicContext';
import React from 'react';
import { ReactNode } from 'react';

const PinTarget = styled('div')`
  position: sticky;
  top: 0.5px;
  width: 100% !important;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type PinnedItemProps = {
  duration: number;
  className?: string;
  children: ReactNode;
};

export const PinnedItem = ({ duration, className, children }: PinnedItemProps): JSX.Element => {
  const pinRef = useRef<HTMLDivElement>(null);
  
  useScrollmagicEffect((controller, Scene) => {
    // IE Only
    const pinStyle = window.getComputedStyle(pinRef.current!);
    if (pinStyle.position !== 'sticky') {
      new Scene({
        triggerElement: pinRef.current!,
        triggerHook: 'onLeave',
        duration: duration,
      })
        .setPin(pinRef.current!, {pushFollowers: false})
        .addTo(controller);
    }
  }, [duration]);

  return (
    <PinTarget className={className} ref={pinRef}>
      {children}
    </PinTarget>
  );
};
