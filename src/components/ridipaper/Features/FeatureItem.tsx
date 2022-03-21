import styled from 'astroturf';
import React from 'react';

const FeatureItem = styled<'div', { runAnimation?: boolean }>('div')`
  margin-top: 200px;
  display: flex;

  &:nth-child(2n) {
    flex-direction: row-reverse;
  }

  @media(max-width: 800px) {
    display: block;
    margin-top: 80px;
  }

  > * {
    /* Chrome flexbox bug: can't use flex: 1 */
    width: 50%;
    opacity: 0;

    @media (max-width: 800px) {
      width: 100%;
    }
  }

  &.runAnimation {
    > :nth-child(1) {
      animation: show 0.5s forwards;
    }

    > :nth-child(2) {
      animation: show 0.5s 0.2s forwards;
    }
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default FeatureItem;
