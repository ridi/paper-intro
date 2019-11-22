import React from 'react';

import Footer from  './footer';
import Header from './header';
import './layout.css';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: Props) => {
  return (
    <>
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
