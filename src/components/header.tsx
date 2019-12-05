import styled, { css } from 'astroturf';
import React from 'react';

import { Link } from 'gatsby';

import RidipaperLogo from '../svgs/ridipaper.inline.svg';

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

const FixedHeader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 50px;
  z-index: 4;
  background-color: white;
  box-shadow: 0px 1px 5px rgba(48, 53, 56, 0.15);
`;

const FixedHeaderInner = styled.div`
  height: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding: 0 20px;
  }
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

  @media (max-width: 320px) {
    padding: 0 10px;
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

    transition: color 0.2s;

    &:hover,
    &:active {
      color: white;
    }

    &.active {
      border-bottom-color: white;
      font-weight: bold;
      color: white;
    }
  }

  .ridipaperLogo, .ridipaperLogoDark {
    width: 107px;
    height: 16px;
  }

  .ridipaperLogo {
    fill: white;
  }

  .ridipaperLogoDark {
    fill: #303538;
  }

  .logoLink {
    line-height: 0;
    transition: opacity 0.2s;

    &:hover,
    &:active {
      opacity: 0.7;
    }
  }
`;

export default function Header() {
  const headerRef = React.useRef<HTMLElement>(null);
  const [showFixedHeader, setShowFixedHeader] = React.useState(false);
  React.useEffect(() => {
    if (window.IntersectionObserver == null) {
      // Fallback: use scroll event
      function checkScroll() {
        setShowFixedHeader(window.scrollY >= headerRef.current!.clientHeight);
      }

      checkScroll();
      window.addEventListener('scroll', checkScroll);
      return () => {
        window.removeEventListener('scroll', checkScroll);
      };
    }

    const io = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target === headerRef.current) {
            setShowFixedHeader(entry.intersectionRatio <= 0);
          }
        });
      },
      {
        threshold: [0, 0.05],
      },
    );
    io.observe(headerRef.current!);
  }, []);

  return (
    <>
      <Container ref={headerRef}>
        <Center>
          <Top>
            <Link to="/" className={styles.logoLink}>
              <RidipaperLogo className={styles.ridipaperLogo} />
            </Link>
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
      {showFixedHeader && (
        <FixedHeader>
          <FixedHeaderInner>
            <Link to="/" className={styles.logoLink}>
              <RidipaperLogo className={styles.ridipaperLogoDark} />
            </Link>
            <LinkButton to="/stockists/" size="small" color="gray" className={styles.buy}>구매하기</LinkButton>
          </FixedHeaderInner>
        </FixedHeader>
      )}
    </>
  );
}
