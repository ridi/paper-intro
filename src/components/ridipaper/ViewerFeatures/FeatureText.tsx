import styled from 'astroturf';
import React from 'react';

import LineBreakText from '@/components/LineBreakText';

const Container = styled<'div', { state?: string }>('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  opacity: 0;
  transform: translateY(60px);

  transition: opacity 0.5s, transform 0.5s;

  &.state-current {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.5s;
  }

  &.state-after {
    transform: translateY(-60px);
  }
`;

const Heading = styled<'h3', { bright?: boolean }>('h3')`
  font-size: 40px;
  line-height: 50px;
  font-weight: bold;
  color: #212529;

  &.bright {
    color: white;
  }

  @media (max-width: 800px) {
    font-size: 28px;
    line-height: 38px;
  }
`;

const Body = styled<'p', { bright?: boolean }>('p')`
  margin-top: 30px;

  &.bright {
    color: white;
  }

  @media (max-width: 800px) {
    margin-top: 20px;
  }

  @media (max-width: 360px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

interface Props {
  heading: string;
  body: string;
  state: 'before' | 'current' | 'after';
  bright?: boolean;
}

export default function FeatureText(props: Props) {
  const { heading, body, state, bright } = props;
  return (
    <Container state={state}>
      <Heading bright={bright}>
        <LineBreakText text={heading} />
      </Heading>
      <Body bright={bright}>
        <LineBreakText text={body} />
      </Body>
    </Container>
  );
}
