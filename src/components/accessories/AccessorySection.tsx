import styled from 'astroturf';
import React from 'react';

import AccessoryDetailSection, { DetailSection } from './AccessoryDetailSection';
import AccessorySpecSection, { SpecSection } from './AccessorySpecSection';
import AccessoryTableSection, { TableSection } from './AccessoryTableSection';

export type Section = DetailSection | SpecSection | TableSection;

const Section = styled.section`
  display: block;
  max-width: 1080px;
  margin: 100px auto 0;

  @media (max-width: 600px) {
    max-width: 1040px;
    margin-top: 80px;
  }

  h2 {
    font-size: 36px;
    line-height: 1.5em;

    @media (max-width: 600px) {
      font-size: 30px;
    }
  }
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
      inner = <AccessorySpecSection data={props.data} />;
      break;
    case 'table':
      inner = <AccessoryTableSection data={props.data} />;
      break;
    default:
      throw ((_: never) => new Error(`Unknown type: ${_}`))(props.data);
  }
  return <Section>{inner}</Section>;
}
