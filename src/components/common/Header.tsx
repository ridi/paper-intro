import styled, { css } from 'astroturf';
import React from 'react';
import { useLocation } from '@reach/router';

import { Link } from 'gatsby';

import RidipaperLogo from '@/svgs/ridipaper.inline.svg';
import Ridipaper4Logo from '@/svgs/paper4-title.black.inline.svg';

const Container = styled.header<{ open: boolean }>`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.5);

  &.open {
    background: rgba(255, 255, 255, 1);
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 600px) {
    padding: 0 20px;
  }

  @media (max-width: 320px) {
    padding: 0 10px;
  }
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div<{ open: boolean }>`
  display: flex;

  @media (max-width: 600px) {
    position: absolute;

    display: flex;
    flex-direction: column;

    width: 100%;

    top: 60px;
    left: 0;
    right: 0;

    background: rgba(255, 255, 255, 0.5);

    overflow: hidden;
    height: 0;
    transition: height 0.2s ease-in-out;

    &.open {
      height: 88px;
      background: rgba(255, 255, 255, 1);
    }
  }
`;

const styles = css`
  .navButton {
    padding: 12px 3px;
    border-bottom: 2px solid transparent;
    font-weight: 400;
    font-size: 16px;
    text-decoration: none;
    color: #000000;

    transition: color 0.2s;

    &:hover,
    &:active {
      color: rgba(0, 0, 0, 0.8);
    }

    &.active {
      font-weight: bold;
      color: #000000;
    }

    @media (min-width: 601px) {
      & + & {
        margin-left: 45px;
      }
    }

    @media (max-width: 600px) {
      margin: 0 20px;
    }

    @media (max-width: 320px) {
      margin: 0 10px;
    }
  }

  .ridipaperLogo,
  .ridipaperLogoDark {
    width: 107px;
    height: 16px;
  }

  .ridipaperLogo {
    fill: white;
  }

  .ridipaperLogoDark {
    fill: #303538;
  }

  .ridipaper4Logo {
    width: 140px;
    height: 16px;
  }

  .logoLink {
    line-height: 0;
    transition: opacity 0.2s;

    &:hover,
    &:active {
      opacity: 0.7;
    }
  }

  .hamburgerButton {
    position: relative;
    padding: 0;
    display: none;
    border: none;
    background: none;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 30px;
    right: -20px;

    @media (max-width: 600px) {
      display: flex;
    }
  }

  .hamburger {
    width: 18px;
    height: 14px;
    position: relative;
    transform: rotate(0deg);
    transition: 0.2s ease-in-out;

    &:hover,
    &:active {
      opacity: 0.7;
    }

    & span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: #303538;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: 0.25s ease-in-out;
    }

    & span:nth-child(1) {
      top: 0px;
    }

    & span:nth-child(2),
    & span:nth-child(3) {
      top: 6px;
    }

    & span:nth-child(4) {
      top: 12px;
    }
  }

  .hamburgerOpen {
    span:nth-child(1) {
      top: 6px;
      width: 0%;
      left: 50%;
    }

    span:nth-child(2) {
      transform: rotate(45deg);
    }

    span:nth-child(3) {
      transform: rotate(-45deg);
    }

    span:nth-child(4) {
      top: 6px;
      width: 0%;
      left: 50%;
    }
  }

  .purchasButton {
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #000000;
    padding: 0 25px;
    border: 1px solid #000000;
    border-radius: 25px;
    height: 36px;
    margin-left: 50px;
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`;

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isRidiPaper4 =
    location.pathname.includes('ridipaper4') || location.pathname === '/';
  return (
    <>
      <Container open={isOpen}>
        <Center>
          <Left>
            <Link to="/" className={styles.logoLink}>
              {isRidiPaper4 ? (
                <Ridipaper4Logo className={styles.ridipaper4Logo} />
              ) : (
                <RidipaperLogo className={styles.ridipaperLogoDark} />
              )}
            </Link>
          </Left>
          <Right open={isOpen}>
            {isRidiPaper4 ? (
              <>
                <Link
                  to="/ridipaper"
                  className={styles.navButton}
                  activeClassName={styles.active}
                >
                  리디페이퍼 3세대
                </Link>
                <Link
                  to="/accessories/ridipaper4"
                  className={styles.navButton}
                  activeClassName={styles.active}
                  partiallyActive
                >
                  액세서리
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={styles.navButton}
                  activeClassName={styles.active}
                >
                  리디페이퍼 4세대
                </Link>
                <Link
                  to="/accessories/ridipaper"
                  className={styles.navButton}
                  activeClassName={styles.active}
                  partiallyActive
                >
                  액세서리
                </Link>

                <Link
                  to="/stockists"
                  className={styles.purchasButton}
                  activeClassName={styles.active}
                  partiallyActive
                >
                  구매하기
                </Link>
              </>
            )}
          </Right>

          <button
            className={styles.hamburgerButton}
            type="button"
            onClick={() => setIsOpen(o => !o)}
          >
            <div
              className={`${styles.hamburger} ${
                isOpen ? `${styles.hamburgerOpen}` : ''
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </Center>
      </Container>
    </>
  );
}
