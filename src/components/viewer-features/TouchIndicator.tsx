import styled from 'astroturf';
import React from 'react';

const TouchIndicator = styled.div`
  position: relative;
  width: 60px;
  height: 60px;

  &::before {
    display: block;
    content: '';

    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;

    border-radius: 30px;
    background-color: rgba(31, 140, 230, 0.3);
  }

  &::after {
    display: block;
    content: '';

    position: absolute;
    left: 15px;
    top: 15px;
    width: 30px;
    height: 30px;

    border-radius: 15px;
    background-color: rgba(31, 140, 230, 0.6);
  }

  @media (max-width: 800px) {
    transform: scale(0.6);
  }
`;

const TouchIndicatorWrapper = styled('div').attrs({
  children: <TouchIndicator />,
})`
`;

export default TouchIndicatorWrapper;
