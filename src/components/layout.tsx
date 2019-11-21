import React from 'react';

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
      <footer>
        © {new Date().getFullYear()}, Built with{' '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  );
};

export default Layout;
