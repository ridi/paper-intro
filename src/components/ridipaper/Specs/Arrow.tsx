import styled from 'astroturf';
import React from 'react';

const ArrowWrapper = styled<'div', { flipped?: boolean }>('div')`
  width: 17px;
  height: 17px;

  &.flipped {
    transform: scaleY(-1);
  }
`;

const ArrowInner = styled.div`
  position: relative;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);

  &::before, &::after {
    display: block;
    content: '';

    position: absolute;
    border-radius: 1px;
    background-color: #212529;
  }

  &::before {
    top: 0;
    right: 0;
    width: 2px;
    height: 12px;
  }

  &::after {
    left: 0;
    bottom: 0;
    width: 12px;
    height: 2px;
  }
`;

interface Props {
  flipped?: boolean;
}

export default function Arrow(props: Props) {
  return (
    <ArrowWrapper flipped={props.flipped}>
      <ArrowInner />
    </ArrowWrapper>
  );
}
