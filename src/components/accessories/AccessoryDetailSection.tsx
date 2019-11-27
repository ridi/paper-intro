import styled from 'astroturf';
import React from 'react';

import { FluidObject } from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

export interface DetailSection {
  type: 'detail';
  name: string;
  title: string;
  description: string;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

interface Props {
  data: DetailSection;
}

export default function AccessoryDetailSection(props: Props) {
  return null;
}
