import styled from 'astroturf';
import React from 'react';

const Arrow = styled.div`
  position: relative;
  width: 67px;
  height: 50px;
  opacity: 0.6;

  &::before,
  &::after {
    display: block;
    content: '';
    position: absolute;
    background-color: #1f8ce6;
  }

  &::before {
    left: 24.32px;
    top: 7.322px;
    width: 35.36px;
    height: 35.36px;
    transform: rotate(45deg);
  }

  &::after {
    left: 0;
    top: 0;
    width: 42px;
    height: 50px;
    border: 12.5px solid white;
    border-width: 12.5px 0;
  }
`;

export default Arrow;
