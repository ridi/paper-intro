import styled from 'astroturf';
import React from 'react';

import Header from './header';
import Hero from './hero';
import './layout.css';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 100px;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Container>{children}</Container>
      </main>
      <footer>
        © {new Date().getFullYear()}, Built with{' '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  );
};

export default Layout;
