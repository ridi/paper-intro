import styled, { css } from 'astroturf';
import React from 'react';

const Container = styled<'section', { long?: boolean }>('section')`
  display: block;
  position: relative;
  height: 600px;

  &.long {
    height: 900px;

    @media(max-width: 800px) {
      height: 700px;
    }
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #636c73;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
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
  renderBackground?(props: { className: string }): React.ReactNode;
}

export default function Hero({ children, className, short, renderBackground }: Props) {
  const background = renderBackground?.({ className: styles.bg });
  return (
    <Container long={!short} className={className}>
      <HeroBackground>
        {background}
      </HeroBackground>
      <HeroOverlay>{children}</HeroOverlay>
    </Container>
  );
}
