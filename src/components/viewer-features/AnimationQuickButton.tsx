import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import Screen from './Screen';
import QuickButtonArrow from './QuickButtonArrow';

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
  }

  &.state-after > div:nth-child(1) {
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
    left: -87px;
    top: calc(50% - 25px);
    opacity: 0;
  }

  &.state-current > div {
    animation:
      appear    0.3s 1s   forwards,
      clickIn   0.3s 1.5s ease-out,
      clickOut  0.3s 1.8s ease-out,
      disappear 0.3s 1.8s forwards;
  }

  @keyframes clickIn {
    from {
      left: -87px;
    }
    to {
      left: -67px;
    }
  }

  @keyframes clickOut {
    from {
      left: -67px;
    }
    to {
      left: -87px;
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.6;
    }
  }

  @keyframes disappear {
    from {
      opacity: 0.6;
    }
    to {
      opacity: 0;
    }
  }
`;

interface Props {
  state: 'before' | 'current' | 'after';
}

export default function AnimationQuickButton(props: Props) {
  const data = useStaticQuery(graphql`
    {
      quickButton: file(relativePath: {eq: "images/viewer-features/quick-button.png"}) {
        ...ScreenImage
      }
    }
  `);

  return (
    <Container state={props.state}>
      <ScreenContainer state={props.state}>
        <Screen file={data.quickButton} />
      </ScreenContainer>
      <TouchIndicatorContainer state={props.state}>
        <QuickButtonArrow />
      </TouchIndicatorContainer>
    </Container>
  );
}
