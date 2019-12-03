import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import Screen from './Screen';

const Container = styled<'div', { state: string }>('div')`
  opacity: 1;
  transition: opacity 0.5s;

  &.state-after {
    opacity: 0;
    transition: none;
  }
`;

const ScreenContainer = styled<'div', { state: string }>('div')`
  > div {
    opacity: 1;
    z-index: 1;
    transition: opacity 0.5s;

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
      left: -12.45%;
      top: -8.902%;
      width: 126.12%;
      height: 122.85%;
    }
  }

  &.state-current > div {
    opacity: 0;

    &:nth-child(2) {
      transition-delay: 1s;
    }

    &:nth-child(1),
    &:nth-child(3) {
      transition-delay: 2s;
    }
  }

  &.state-after > div {
    transition: none;
    opacity: 1;
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
          <Img fluid={data.book.childImageSharp.fluid} />
        </div>
        <Screen file={data.textTransparent} />
      </ScreenContainer>
    </Container>
  );
}
