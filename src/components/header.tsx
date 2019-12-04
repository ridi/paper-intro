import styled, { css } from 'astroturf';
import React from 'react';

import { Link } from 'gatsby';

import RidipaperLogo from '../svgs/ridipaper.svg';

import { LinkButton } from './Button';

const Container = styled.header`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 600px) {
    padding: 0 20px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const Bottom = styled.nav`
  display: flex;
  margin-bottom: -1px;

  > * + * {
    margin-left: 18px;
  }
`;

const styles = css`
  .buy {
    padding: 0 10px;
  }

  .navButton {
    padding: 12px 3px;
    border-bottom: 2px solid transparent;
    font-size: 16px;
    line-height: 24px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);

    &.active {
      border-bottom-color: white;
      font-weight: bold;
      color: white;
    }
  }

  .ridipaperLogo {
    width: 106.36px;
    height: 16px;
    fill: white;
  }
`;

const Header = () => (
  <Container>
    <Center>
      <Top>
        <img src={RidipaperLogo} className={styles.ridipaperLogo} alt="RIDIPAPER" />
        <LinkButton to="/stockists/" size="small" color="white" className={styles.buy}>구매하기</LinkButton>
      </Top>
      <Bottom>
        <Link to="/" className={styles.navButton} activeClassName={styles.active}>
          RIDIPAPER
        </Link>
        <Link to="/pro/" className={styles.navButton} activeClassName={styles.active}>
          PAPER PRO
        </Link>
        <Link to="/accessories/" className={styles.navButton} activeClassName={styles.active} partiallyActive>
          Accessory
        </Link>
      </Bottom>
    </Center>
  </Container>
);

export default Header;
