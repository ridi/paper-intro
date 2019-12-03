import styled from 'astroturf';
import React from 'react';

import Dots from './Dots';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  height: 800px;

  @media (max-width: 800px) {
    display: block;
    height: auto;
  }
`;

const FlexSpacer = styled.div`
  flex: 0 0 auto;
  width: calc(50% - 594px);

  @media (max-width: 800px) {
    display: none;
  }
`;

const PaperContainer = styled.div`
  flex: 1 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  margin-left: 94px;

  @media (max-width: 800px) {
    display: block;
    margin: 0 40px;
  }
`;

interface Props {
  phase: number;
  totalPhases: number;
  children: React.ReactNode;
}

export default function FeatureView(props: Props) {
  const { children, phase, totalPhases } = props;

  return (
    <Container>
      <FlexSpacer />
      <PaperContainer>{children}</PaperContainer>
      <FlexSpacer />
      <Dots max={totalPhases} value={Math.max(0, phase)} dark={phase === 3} />
    </Container>
  );
}
