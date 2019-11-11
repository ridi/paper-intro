import styled, { css } from 'astroturf';
import { Link } from 'gatsby';
import React from 'react';

const Container = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const Center = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`;

const styles = css`
  .link {
    color: white;
    text-decoration: none;
  }
`;

interface Props {
  siteTitle: string;
}

const Header = ({ siteTitle }: Props) => (
  <Container>
    <Center>
      <h1 style={{ margin: 0 }}>
        <Link to="/" className={styles.link}>
          {siteTitle}
        </Link>
      </h1>
    </Center>
  </Container>
);

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
