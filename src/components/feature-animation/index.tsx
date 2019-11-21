import styled from 'astroturf';
import React from 'react';

import FeatureAnimationBody from './FeatureAnimationBody';

const FeatureAnimationTitle = styled.h3`
  margin-bottom: 96px;

  @media (max-width: 800px) {
    margin-bottom: 50px;
  }
`;

export default function FeatureAnimation() {
  return (
    <section>
      <FeatureAnimationTitle>{'책과\xa0가장\xa0가까운, 그러나\xa0책\xa0그\xa0이상'}</FeatureAnimationTitle>
      <FeatureAnimationBody />
    </section>
  );
}
