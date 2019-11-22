import styled, { css } from 'astroturf';
import React from 'react';

import RidipaperLogo from '../svgs/ridipaper.svg';

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
  max-width: 1032px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const BuyButton = styled.a`
  display: inline-block;
  height: 30px;
  padding: 6px 10px;
  border: 1px solid white;
  border-radius: 3px;
  font-size: 13px;
  font-weight: bold;
  line-height: 18px;
  text-align: center;
  color: white;
`;

const Bottom = styled.nav`
  display: flex;
  margin-bottom: -1px;

  > * + * {
    margin-left: 18px;
  }
`;

const NavButton = styled<'a', { active?: boolean }>('a')`
  padding: 12px 3px;
  border-bottom: 2px solid transparent;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.7);

  &.active {
    border-bottom-color: white;
    font-weight: bold;
    color: white;
  }
`;

const styles = css`
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
        <RidipaperLogo className={styles.ridipaperLogo} />
        <BuyButton>구매하기</BuyButton>
      </Top>
      <Bottom>
        <NavButton active>RIDIPAPER</NavButton>
        <NavButton>PAPER PRO</NavButton>
      </Bottom>
    </Center>
  </Container>
);

export default Header;
