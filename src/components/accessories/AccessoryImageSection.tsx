import { css } from 'astroturf';
import React from 'react';

import Img, { FluidObject } from 'gatsby-image';

export interface ImageSection {
  type: 'image';
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const styles = css`
  .image {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }
`;

interface Props {
  data: ImageSection;
}

export default function AccessoryImageSection(props: Props) {
  return <Img fluid={props.data.image.childImageSharp.fluid} className={styles.image} />;
}
