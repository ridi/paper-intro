import styled from 'astroturf';
import React from 'react';

const Container = styled.div`
  display: flex;

  &:nth-child(2n) {
    flex-direction: row-reverse;
  }

  > * {
    flex: 1;
  }

  @media(max-width: 800px) {
    display: block;
  }
`;

interface Props {
  children?: React.ReactNode;
}

export default function Feature(props: Props) {
  const { children } = props;
  return (
    <Container>
      {children}
    </Container>
  );
}

const FeatureDescriptionWrapper = styled.div`
  display: flex;
  align-items: center;

  @media(max-width: 800px) {
    margin-top: 50px;
  }
`;

const FeatureDescriptionInner = styled.div`
  padding: 0 100px;

  @media(max-width: 1200px) {
    padding: 0 40px;
  }

  @media(max-width: 600px) {
    padding: 0 20px;
  }

  > div {
    width: 60px;
    height: 60px;
    background-color: #636c73;
  }

  > h3 {
    font-size: 48px;
    line-height: 60px;

    @media(max-width: 1200px) {
      font-size: 44px;
    }

    @media(max-width: 800px) {
      font-size: 32px;
      line-height: 44px;
    }
  }

  > p {
    font-size: 20px;
    line-height: 28px;
    color: #636c73;
  }

  > * + * {
    margin-top: 30px;
  }
`;

export function FeatureDescription({ children }: { children?: React.ReactNode }) {
  return (
    <FeatureDescriptionWrapper>
      <FeatureDescriptionInner>{children}</FeatureDescriptionInner>
    </FeatureDescriptionWrapper>
  );
}
