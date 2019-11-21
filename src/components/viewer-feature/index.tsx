import styled from 'astroturf';
import React from 'react';

import Body from './Body';

const Title = styled.h3`
  margin-bottom: 96px;

  @media (max-width: 800px) {
    margin-bottom: 50px;
  }
`;

export default function ViewerFeature() {
  return (
    <section>
      <Title>{'책과\xa0가장\xa0가까운, 그러나\xa0책\xa0그\xa0이상'}</Title>
      <Body />
    </section>
  );
}
