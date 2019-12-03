import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

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
        active 0.5s 0.5s          forwards,
        active 1.5s 1.5s reverse  forwards,
        warm   1.5s 1.5s step-end forwards,
        active 1.5s 3.5s          forwards;
    }
  }

  &.state-after > div {
    &:nth-child(1) {
      opacity: 1;
    }

    &:nth-child(2) {
      background-color: #f90;
      opacity: 0.4;
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

  @keyframes active {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.4;
    }
  }

  @keyframes warm {
    to {
      background-color: #f90;
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
        appear 0.5s 1s   ease-out forwards,
        slide  1.5s 1.5s forwards,
        appear 0.5s 3s   ease-in reverse forwards;
    }
    &:nth-child(1),
    &:nth-child(3) {
      animation:
        appear 0.5s 3s   ease-out forwards,
        slide  1.5s 3.5s forwards,
        appear 0.5s 5s   ease-in reverse forwards;
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
`;

interface Props {
  state: 'before' | 'current' | 'after';
}

export default function AnimationFrontlight(props: Props) {
  const data = useStaticQuery(graphql`
    {
      dark: file(relativePath: {eq: "images/viewer-features/device-dark.png"}) {
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
