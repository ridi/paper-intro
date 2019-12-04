import React from 'react';

import Footer from  './footer';
import Header from './header';

import 'normalize.css';
import './layout.css';

interface Props {
  children?: React.ReactNode;
  className?: string;
  noFooterMargin?: boolean;
}

const Layout = ({ children, className, noFooterMargin }: Props) => {
  return (
    <>
      <Header />
      <main className={className}>{children}</main>
      <Footer noMarginTop={noFooterMargin} />
    </>
  );
};

export default Layout;
