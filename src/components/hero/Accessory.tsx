import styled from 'astroturf';
import React from 'react';

import Hero from './index';

const HeroContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px;

  h1 {
    color: white;
  }

  > h1 {
    margin-top: 30px;
  }

  > hgroup {
    > h2 {
      color: rgba(255, 255, 255, 0.5);
    }

    > h1 {
      margin-top: 20px;
    }
  }

  > p {
    margin-top: 30px;
    color: white;
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
