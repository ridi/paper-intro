import styled from 'astroturf';
import React from 'react';

import { graphql } from 'gatsby';
import Img, { FluidObject, GatsbyImageProps } from 'gatsby-image';

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
  loading?: GatsbyImageProps["loading"];
}

export default function Screen(props: Props) {
  const { file, loading, ...restProps } = props;
  const imgProps = { loading };
  return (
    <Container {...restProps}>
      <Img fluid={file.childImageSharp.fluid} {...imgProps} />
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
