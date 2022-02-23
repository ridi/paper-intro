import styled, { css } from 'astroturf';
import React from 'react';

import 'normalize.css';
import './layout.css';

const Container = styled.div`
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const styles = css`
  html,
  body {
    overscroll-behavior: none;
  }

  .black {
    background: #000000;
  }

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
  React.useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.classList.add(styles.black);
    }

    const onScroll = () => {
      if (body && window.scrollY <= 0) {
        body.classList.add(styles.black);
      } else if (body) {
        body.classList.remove(styles.black);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: false });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
  return (
    <Container>
      <main className={styles.desktop}>{desktop}</main>
      <main className={styles.mobile}>{mobile}</main>
      {children}
    </Container>
  );
};

export default TeaserLayout;
