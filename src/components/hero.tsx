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
  background-color: #636c73;
`;

const HeroOverlay = styled.div`
  position: relative;
  padding-top: 100px;
`;

const styles = css`
  .bg {
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
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

interface Props {
  children?: React.ReactNode;
  className?: string;
  short?: boolean;
  renderBackground?(props: { className: string }): React.ReactNode;
}

export default function Hero({ children, className, short, renderBackground }: Props) {
  const background = renderBackground?.({ className: styles.bg }) || <HeroBackground className={styles.bg} />;
  return (
    <Container long={!short} className={className}>
      {background}
      <HeroOverlay>{children}</HeroOverlay>
    </Container>
  );
}
