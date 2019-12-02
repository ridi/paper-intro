import styled, { css } from 'astroturf';
import React from 'react';

const Container = styled<'header', { long?: boolean }>('header')`
  position: relative;
  height: 600px;

  @media (max-width: 600px) {
    height: 440px;
  }

  &.long {
    height: 900px;

    @media (max-width: 800px),
    @media (max-width: 600px) {
      height: 700px;
    }
  }
`;

const HeroBackground = styled<'div', { bright?: boolean }>('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  &.bright::after {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const HeroOverlay = styled.div`
  position: relative;
  height: 100%;
  padding-top: 100px;
`;

const styles = css`
  .bg {
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  children?: React.ReactNode;
  className?: string;
  short?: boolean;
  bright?: boolean;
  renderBackground?(props: { className: string }): React.ReactNode;
}

export default function Hero({ children, className, short, bright, renderBackground }: Props) {
  const background = renderBackground?.({ className: styles.bg });
  return (
    <Container long={!short} className={className}>
      <HeroBackground bright={bright}>
        {background}
      </HeroBackground>
      <HeroOverlay>{children}</HeroOverlay>
    </Container>
  );
}
