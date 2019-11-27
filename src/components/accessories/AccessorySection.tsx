import styled from 'astroturf';
import React from 'react';

import AccessoryDetailSection, { DetailSection } from './AccessoryDetailSection';

interface SpecSection {
  type: 'spec';
  items: {
    name: string;
    desc: string;
  }[];
}

export type Section = DetailSection | SpecSection;

const Section = styled.section`
  display: block;
  max-width: 1000px;
  margin: 100px auto 0;
`;

interface Props {
  data: Section;
}

export default function AccessorySection(props: Props) {
  let inner = null;
  switch (props.data.type) {
    case 'detail':
      inner = <AccessoryDetailSection data={props.data} />;
      break;
    case 'spec':
      break;
    default:
      throw ((_: never) => new Error(`Unknown type: ${_}`))(props.data);
  }
  return <Section>{inner}</Section>;
}
