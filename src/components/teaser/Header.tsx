import styled, { css } from 'astroturf';
import React from 'react';

import { Link } from 'gatsby';

import RidiLogoWhite from '../../svgs/ridi-logo.white.inline.svg';
import RidiLogoBlack from '../../svgs/ridi-logo.black.inline.svg';

const Container = styled<'header', { state: string }>('header')`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 36px;
  z-index: 99999;

  opacity: 0;

  &.state-current {
    opacity: 1;
  }

  @media (max-width: 600px) {
    padding: 26px 15px;
  }
`;

const Button = styled<typeof Link, { black?: boolean }>(Link)`
  display: flex;
  align-items: center;
  height: 39px;

  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  text-decoration: none;

  padding: 10px 20px;

  border: 1px solid #ffffff;
  border-radius: 25px;

  &.black {
    color: #000000;
    border-color: #000000;
  }

  @media (max-width: 600px) {
    height: 32px;
    font-size: 12px;
  }
`;

const styles = css`
  .logo {
    @media (max-width: 600px) {
      width: 42px;
    }
  }
`;

interface Props {
  type: 'white' | 'black';
  state: 'before' | 'current' | 'after';
}

export default function Header(props: Props) {
  return (
    <Container state={props.state}>
      <Link to="/">
        {props.type === 'black' && <RidiLogoWhite className={styles.logo} />}
        {props.type === 'white' && <RidiLogoBlack className={styles.logo} />}
      </Link>
      <Button to="/ridipaper" black={props.type === 'white'}>
        리디페이퍼3세대
      </Button>
    </Container>
  );
}
