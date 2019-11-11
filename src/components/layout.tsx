import styled from 'astroturf';
import React from 'react';

import Header from './header';
import './layout.css';

const Hero = styled.div`
  position: relative;
  height: 900px;
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
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Hero>
        <HeroBackground />
        <HeroOverlay>
          <Header />
        </HeroOverlay>
      </Hero>
      <Container>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with{' '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Container>
    </>
  );
};

export default Layout;
