import styled from 'astroturf';
import React from 'react';

import LineBreakText from '../LineBreakText';

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

const Heading = styled<'div', { bright?: boolean }>('div')`
  font-size: 48px;
  line-height: 60px;
  font-weight: bold;
  color: #212529;

  &.bright {
    color: white;
  }

  @media (max-width: 800px) {
    font-size: 30px;
    line-height: 40px;
  }
`;

const Body = styled<'div', { bright?: boolean }>('div')`
  margin-top: 30px;
  font-size: 20px;
  line-height: 28px;
  color: #636c73;

  &.bright {
    color: white;
  }

  @media (max-width: 800px) {
    margin-top: 20px;
    font-size: 18px;
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
