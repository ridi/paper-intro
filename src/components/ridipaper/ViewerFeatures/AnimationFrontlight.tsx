import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

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

    &:nth-child(1) {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    &:nth-child(2) {
      position: absolute;
      left: 9%;
      top: 11%;
      width: 80%;
      height: 80%;
      background-color: black;
      z-index: -1;
    }
  }

  &.state-current > div {
    &:nth-child(1) {
      animation: appear 0.5s 0.5s forwards;
    }

    &:nth-child(2) {
      animation:
        active0  0.5s 0.5s          forwards,
        deactive 1.5s 1.5s          forwards,
        warm     1.5s 1.5s step-end forwards,
        active1  1.5s 3.5s          forwards;
    }
  }

  &.state-after > div {
    &:nth-child(1) {
      opacity: 1;
    }

    &:nth-child(2) {
      background-color: #ec7a12;
      opacity: 0.4;
    }
  }

  @keyframes active0 {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.4;
    }
  }

  @keyframes active1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.4;
    }
  }

  @keyframes deactive {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes warm {
    to {
      background-color: #ec7a12;
    }
  }
`;

const TouchIndicatorContainer = styled<'div', { state: string }>('div')`
  > div {
    position: absolute;
    opacity: 0;
    top: calc(69.14% - 30px);

    &:nth-child(1) {
      left: calc(49.59% - 65px);
    }
    &:nth-child(2) {
      left: calc(49.59% - 30px);
    }
    &:nth-child(3) {
      left: calc(49.59% +  5px);
    }
  }

  &.state-current > div {
    &:nth-child(2) {
      animation:
        appear    0.5s 1s   ease-out forwards,
        slide     1.5s 1.5s forwards,
        disappear 0.5s 3s   ease-out forwards;
    }
    &:nth-child(1),
    &:nth-child(3) {
      animation:
        appear    0.5s 3s   ease-out forwards,
        slide     1.5s 3.5s forwards,
        disappear 0.5s 5s   ease-out forwards;
    }
  }

  @keyframes slide {
    to {
      top: calc(32.05% - 30px);
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

  @keyframes disappear {
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

export default function AnimationFrontlight(props: Props) {
  const data = useStaticQuery(graphql`
    {
      dark: file(relativePath: {eq: "images/ridipaper/viewer-features/device-dark.png"}) {
        childImageSharp {
          fluid(maxWidth: 490, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);

  return (
    <Container state={props.state}>
      <ScreenContainer state={props.state}>
        <div>
          <Img fluid={data.dark.childImageSharp.fluid} />
        </div>
        <div />
      </ScreenContainer>
      <TouchIndicatorContainer state={props.state}>
        <TouchIndicator />
        <TouchIndicator />
        <TouchIndicator />
      </TouchIndicatorContainer>
    </Container>
  );
}
