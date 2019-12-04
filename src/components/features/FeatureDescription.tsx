import styled from 'astroturf';
import React from 'react';

const FeatureDescriptionWrapper = styled.div`
  display: flex;
  align-items: center;

  @media(max-width: 800px) {
    margin-top: 50px;
  }
`;

const FeatureDescriptionInner = styled<'div', { runAnimation?: boolean }>('div')`
  padding: 0 100px;
  opacity: 0;

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

  &.runAnimation {
    animation: show 0.5s 0.2s forwards;
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface Props {
  children?: React.ReactNode;
  innerRef?: React.RefObject<HTMLDivElement>;
  runAnimation?: boolean;
}

export default function FeatureDescription(props: Props) {
  const { children, innerRef, runAnimation } = props;
  return (
    <FeatureDescriptionWrapper>
      <FeatureDescriptionInner ref={innerRef} runAnimation={runAnimation}>
        {children}
      </FeatureDescriptionInner>
    </FeatureDescriptionWrapper>
  );
};
