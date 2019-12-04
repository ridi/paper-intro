import styled from 'astroturf';
import React from 'react';

import { graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

const Container = styled.div`
  position: absolute;
  left: 9.184%;
  top: 11.42%;
  width: 78.78%;
  height: 77.45%;
  z-index: -2;
`;

interface Props extends React.HTMLAttributes<HTMLElement> {
  file: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  critical?: boolean;
}

export default function Screen(props: Props) {
  const { file, critical, ...restProps } = props;
  return (
    <Container {...restProps}>
      <Img fluid={file.childImageSharp.fluid} critical={critical} />
    </Container>
  );
}

export const query = graphql`
  fragment ScreenImage on File {
    childImageSharp {
      fluid(maxWidth: 386, quality: 90) {
        ...GatsbyImageSharpFluid_withWebp_noBase64
      }
    }
  }
`;
