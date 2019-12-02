import React from 'react';

import { FluidObject } from 'gatsby-image';

export interface ImageSection {
  type: 'image';
  width: number;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

interface Props {
  data: ImageSection;
}

export default function AccessoryImageSection(props: Props) {
  return null;
}
