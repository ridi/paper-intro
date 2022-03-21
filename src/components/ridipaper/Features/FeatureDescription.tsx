import styled from 'astroturf';
import React from 'react';

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

  > img {
    width: 60px;
    height: 60px;
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

  > * + * {
    margin-top: 30px;
  }
`;

interface Props {
  children?: React.ReactNode;
}

export default function FeatureDescription(props: Props) {
  const { children } = props;
  return (
    <FeatureDescriptionWrapper>
      <FeatureDescriptionInner>
        {children}
      </FeatureDescriptionInner>
    </FeatureDescriptionWrapper>
  );
};
