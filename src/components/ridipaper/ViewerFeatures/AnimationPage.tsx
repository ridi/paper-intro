import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import Screen from './Screen';
import TouchIndicator from './TouchIndicator';

const Container = styled<'div', { state: string }>('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s;

  &.state-current {
    opacity: 1;
  }
`;

const ScreenContainer = styled<'div', { state: string }>('div')`
  > div {
    opacity: 0;
  }

  &.state-current > div {
    animation: screen 0.3s;
    animation-fill-mode: forwards;

    &:nth-child(1) {
      animation-delay: 1.8s;
    }
    &:nth-child(2) {
      animation-delay: 2.4s;
    }
    &:nth-child(3) {
      animation-delay: 3s;
    }
    &:nth-child(4) {
      animation-delay: 3.6s;
    }
  }

  &.state-after > div:nth-child(4) {
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
    left: calc(97.14% - 30px);
    top: calc(56.53% - 30px);
    opacity: 0;
  }

  &.state-current > div {
    animation:
      appear0a 0.3s 1s   forwards,
      touch0a  0.3s 1.5s ease-out,
      touch0b  0.3s 1.8s ease-out,
      touch1a  0.3s 2.1s ease-out,
      touch1b  0.3s 2.4s ease-out,
      touch2a  0.3s 2.7s ease-out,
      touch2b  0.3s 3s   ease-out,
      touch3a  0.3s 3.3s ease-out,
      touch3b  0.3s 3.6s ease-out,
      appear0b 0.3s 4.2s forwards;
  }

  @keyframes touch0a {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.83);
    }
  }

  @keyframes touch0b {
    from {
      transform: scale(0.83);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes touch1a {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.83);
    }
  }

  @keyframes touch1b {
    from {
      transform: scale(0.83);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes touch2a {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.83);
    }
  }

  @keyframes touch2b {
    from {
      transform: scale(0.83);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes touch3a {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.83);
    }
  }

  @keyframes touch3b {
    from {
      transform: scale(0.83);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes appear0a {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes appear0b {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

interface Props {
  state: 'before' | 'current' | 'after';
}

export default function AnimationPage(props: Props) {
  const data = useStaticQuery(graphql`
    {
      text2: file(relativePath: {eq: "images/ridipaper/viewer-features/text2.png"}) {
        ...ScreenImage
      }
      text3: file(relativePath: {eq: "images/ridipaper/viewer-features/text3.png"}) {
        ...ScreenImage
      }
      text4: file(relativePath: {eq: "images/ridipaper/viewer-features/text4.png"}) {
        ...ScreenImage
      }
      text5: file(relativePath: {eq: "images/ridipaper/viewer-features/text5.png"}) {
        ...ScreenImage
      }
    }
  `);

  return (
    <Container state={props.state}>
      <ScreenContainer state={props.state}>
        <Screen file={data.text2} />
        <Screen file={data.text3} />
        <Screen file={data.text4} />
        <Screen file={data.text5} />
      </ScreenContainer>
      <TouchIndicatorContainer state={props.state}>
        <TouchIndicator />
      </TouchIndicatorContainer>
    </Container>
  );
}
