import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const Container = styled.div`
  position: relative;
  width: 50%;
  max-width: 490px;
  overflow: visible;

  @media (max-width: 800px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const styles = css`
  .paper {
    position: relative;
    width: 100%;
  }
`;

interface Props {
  children?: React.ReactNode;
}

export default function PaperDeviceContainer(props: Props) {
  const data = useStaticQuery(graphql`
    {
      bright: file(relativePath: {eq: "device-bright.png"}) {
        childImageSharp {
          fluid(sizes: "(max-width: 490px) 100vw, (max-width: 800px) 490px, (max-width: 980px) 50vw, 490px") {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);
  const { children } = props;
  return (
    <Container>
      <Img fluid={data.bright.childImageSharp.fluid} className={styles.paper} />
      {children}
    </Container>
  );
}
