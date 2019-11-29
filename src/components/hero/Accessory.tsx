import styled from 'astroturf';
import React from 'react';

import Hero from './index';

const HeroContainer = styled.header`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px;

  @media (max-width: 600px) {
    padding: 50px 0;
    text-align: center;
  }

  > h1 {
    margin-top: 20px;
    font-size: 48px;
    line-height: 60px;
    color: white;

    @media (max-width: 600px) {
      font-size: 36px;
      line-height: 48px;
    }

    &:first-child {
      margin-top: 30px;

      @media (max-width: 600px) {
        margin-top: 10px;
      }
    }
  }

  > p {
    margin-top: 30px;
    color: white;

    &:first-child {
      margin-top: 0;
      font-size: 13px;
      line-height: 19px;
      font-weight: bold;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

interface Props {
  children?: React.ReactNode;
  renderBackground?(props: { className: string }): React.ReactNode;
}

export default function IndexHero(props: Props) {
  return (
    <Hero short renderBackground={props.renderBackground}>
      <HeroContainer>{props.children}</HeroContainer>
    </Hero>
  );
}
