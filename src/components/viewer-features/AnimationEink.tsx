import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import Screen from './Screen';

const Container = styled<'div', { state: string }>('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.3s;

  &.state-after {
    opacity: 0;
    transition: none;
  }
`;

const ScreenContainer = styled<'div', { state: string }>('div')`
  > div {
    z-index: 1;
    transition: opacity 0.8s;

    &:nth-child(1) {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: white;
    }

    &:nth-child(2) {
      position: absolute;
      left: -10.95%;
      top: -3.380%;
      width: 126.73%;
      height: 121.51%;
    }
  }

  &.state-current > div {
    opacity: 0;

    &:nth-child(2) {
      transition-delay: 1s;
    }

    &:nth-child(1),
    &:nth-child(3) {
      transition-delay: 1.8s;
    }
  }

  &.state-after > div {
    transition: none;
  }
`;

interface Props {
  state: 'before' | 'current' | 'after';
}

export default function AnimationEink(props: Props) {
  const data = useStaticQuery(graphql`
    {
      book: file(relativePath: {eq: "images/viewer-features/book.png"}) {
        childImageSharp {
          fluid(maxWidth: 618, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      textTransparent: file(relativePath: {eq: "images/viewer-features/text-transparent.png"}) {
        ...ScreenImage
      }
    }
  `);

  return (
    <Container state={props.state}>
      <ScreenContainer state={props.state}>
        <div />
        <div>
          <Img fluid={data.book.childImageSharp.fluid} loading="eager" />
        </div>
        <Screen file={data.textTransparent} loading="eager" />
      </ScreenContainer>
    </Container>
  );
}
