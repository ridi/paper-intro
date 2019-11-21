import styled from 'astroturf';
import React from 'react';

const Container = styled.section`
  display: block;
  position: relative;
  height: 900px;

  @media(max-width: 800px) {
    height: 700px;
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
  padding-top: 100px;
`;

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function Hero({ children, className }: Props) {
  return (
    <Container className={className}>
      <HeroBackground />
      <HeroOverlay>{children}</HeroOverlay>
    </Container>
  );
}
