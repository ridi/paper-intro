import styled from 'astroturf';
import React from 'react';

import Footer from  './Footer';
import Header from './Header';

import 'normalize.css';
import './Layout.css';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Spacer = styled.div`
  flex: 1;
`;

interface Props {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  noFooterMargin?: boolean;
}

const Layout = ({ children, containerClassName, className, noFooterMargin }: Props) => {
  return (
    <Container className={containerClassName}>
      <Header />
      <main className={className}>{children}</main>
      <Spacer />
      <Footer noMarginTop={noFooterMargin} />
    </Container>
  );
};

export default Layout;
