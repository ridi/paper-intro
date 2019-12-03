import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import Screen from './Screen';
import TouchIndicator from './TouchIndicator';

const Container = styled<'div', { state: string }>('div')`
  opacity: 0;
  transition: opacity 0.3s;

  &.state-current {
    opacity: 1;
  }
`;

const ScreenContainer = styled<'div', { state: string }>('div')`
  > div {
    opacity: 0;

    &:nth-child(1) {
      opacity: 1;
    }
  }

  &.state-current > div {
    animation: screen 0.3s;
    animation-fill-mode: forwards;

    &:nth-child(1) {
      animation: none;
    }
    &:nth-child(2) {
      animation-delay: 1.8s;
    }
    &:nth-child(3) {
      animation-delay: 2.7s;
    }
    &:nth-child(4) {
      animation-delay: 3.3s;
    }
    &:nth-child(5) {
      animation-delay: 3.9s;
    }
  }

  &.state-after > div:nth-child(5) {
    opacity: 1;
  }

  @keyframes screen {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TouchIndicatorContainer = styled<'div', { state: string }>('div')`
  > div {
    position: absolute;
    left: 52.24%;
    top: 79.82%;
    opacity: 0;
  }

  &.state-current > div {
    animation:
      appear 0.3s 1s   forwards,
      touch  0.3s 1.5s ease-out,
      touch  0.3s 1.8s ease-in reverse,
      appear 0.3s 1.8s reverse forwards,
      move   0.3s 1.8s step-end forwards,
      appear 0.3s 2.1s forwards,
      touch  0.3s 2.4s ease-out,
      touch  0.3s 2.7s ease-in reverse,
      touch  0.3s 3s   ease-out,
      touch  0.3s 3.3s ease-in reverse,
      touch  0.3s 3.6s ease-out,
      touch  0.3s 3.9s ease-in reverse,
      appear 0.3s 4.5s reverse forwards;
  }

  @keyframes touch {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.83);
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes move {
    to {
      left: 72.45%;
      top: 49.41%;
    }
  }
`;

interface Props {
  state: 'before' | 'current' | 'after';
}

export default function AnimationViewerSettings(props: Props) {
  const data = useStaticQuery(graphql`
    {
      toolbar: file(relativePath: {eq: "images/viewer-features/toolbar.png"}) {
        ...ScreenImage
      }
      size6: file(relativePath: {eq: "images/viewer-features/size6.png"}) {
        ...ScreenImage
      }
      size7: file(relativePath: {eq: "images/viewer-features/size7.png"}) {
        ...ScreenImage
      }
      size8: file(relativePath: {eq: "images/viewer-features/size8.png"}) {
        ...ScreenImage
      }
      size9: file(relativePath: {eq: "images/viewer-features/size9.png"}) {
        ...ScreenImage
      }
    }
  `);

  return (
    <Container state={props.state}>
      <ScreenContainer state={props.state}>
        <Screen file={data.toolbar} />
        <Screen file={data.size6} />
        <Screen file={data.size7} />
        <Screen file={data.size8} />
        <Screen file={data.size9} />
      </ScreenContainer>
      <TouchIndicatorContainer state={props.state}>
        <TouchIndicator />
      </TouchIndicatorContainer>
    </Container>
  );
}