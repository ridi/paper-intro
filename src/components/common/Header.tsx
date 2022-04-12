import styled, { css } from 'astroturf';
import React from 'react';
import { useLocation } from '@reach/router';

import { Link } from 'gatsby';

import RidipaperLogo from '@/svgs/ridipaper.inline.svg';
import Ridipaper4Logo from '@/svgs/paper4-title.black.inline.svg';
import ArrowDown from '@/svgs/arrow-down.inline.svg';
import IconClose from '@/svgs/close.inline.svg';

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
  justify-content: center;
  align-items: center;

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
      height: 100px;
      background: rgba(255, 255, 255, 1);
      align-items: flex-start;
    }
  }
`;

const MobileRight = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
`;

const IconExpand = styled(ArrowDown)`
  margin-right: -3px;
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

  .menuButton {
    display: none;
    align-items: center;
    text-decoration: none;
    padding: 0 0 0 20px;

    @media (max-width: 600px) {
      display: flex;
    }
  }

  .purchaseButton {
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

    @media (max-width: 600px) {
      margin-left: 10px;
    }
  }
`;

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isRidiPaper4 =
    location.pathname.includes('ridipaper4') || location.pathname === '/';

  React.useEffect(() => {
    const resetOpen = () => {
      setIsOpen(false);
    };

    window.addEventListener('resize', resetOpen);
    return () => {
      window.removeEventListener('resize', resetOpen);
    };
  }, []);
  return (
    <>
      <Container open={isOpen}>
        <Center>
          <Left>
            {isRidiPaper4 ? (
              <Link to="/" className={styles.logoLink}>
                <Ridipaper4Logo className={styles.ridipaper4Logo} />
              </Link>
            ) : (
              <Link to="/ridipaper" className={styles.logoLink}>
                <RidipaperLogo className={styles.ridipaperLogoDark} />
              </Link>
            )}
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
                {!isOpen && (
                  <Link
                      to="/stockists/ridipaper4"
                      className={styles.purchaseButton}
                      activeClassName={styles.active}
                      partiallyActive
                    >
                    구매하기
                  </Link>
                ) }
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
                {!isOpen && (
                  <Link
                    to="/stockists/ridipaper"
                    className={styles.purchaseButton}
                    activeClassName={styles.active}
                    partiallyActive
                  >
                    구매하기
                  </Link>
                )}
              </>
            )}
          </Right>

          <MobileRight>
            <button
              className={styles.menuButton}
              type="button"
              onClick={() => setIsOpen(o => !o)}
            >
              <Icon>{isOpen ? <IconClose /> : <IconExpand />}</Icon>
            </button>

            {!isOpen && !isRidiPaper4 && (
              <Link
                to="/stockists"
                className={styles.purchaseButton}
                activeClassName={styles.active}
                partiallyActive
              >
                구매하기
              </Link>
            )}
          </MobileRight>
        </Center>
      </Container>
    </>
  );
}
