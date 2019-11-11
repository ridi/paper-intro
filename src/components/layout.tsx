/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import styled from 'astroturf';
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
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
