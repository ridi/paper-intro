import styled, { css } from 'astroturf';
import React from 'react';

import 'normalize.css';
import './layout.css';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const styles = css`
  .desktop {
    display: none;
    @media (min-width: 601px) {
      display: block;
    }
  }

  .mobile {
    display: none;
    @media (max-width: 600px) {
      display: block;
    }
  }
`;

interface Props {
  desktop: React.ReactNode;
  mobile: React.ReactNode;
  children?: React.ReactNode;
}

const TeaserLayout = ({ desktop, mobile, children }: Props) => {
  return (
    <Container>
      <main className={styles.desktop}>{desktop}</main>
      <main className={styles.mobile}>{mobile}</main>
      {children}
    </Container>
  );
};

export default TeaserLayout;
