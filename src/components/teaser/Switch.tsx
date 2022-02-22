import styled, { css } from 'astroturf';
import React from 'react';

import DotBlackTop from '../../svgs/DotBlackTop.inline.svg';
import DotBlackBottom from '../../svgs/DotBlackBottom.inline.svg';

import DotWhiteTop from '../../svgs/DotWhiteTop.inline.svg';
import DotWhiteBottom from '../../svgs/DotWhiteBottom.inline.svg';

const Container = styled.div`
  position: absolute;
  top: auto;
  left: 0;
  right: 0;
  bottom: 54px;
`;

const styles = css`
  .switch {
    position: relative;
    display: block;
    width: 160px;
    height: 32px;
    margin: 0 auto;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ddd;
    border-radius: 8px;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 29px;
    width: 80px;
    left: 1px;
    bottom: 1.5px;
    background-color: #000000;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #ddd;
    border-radius: 8px;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #ddd;
  }

  input:checked + .slider:before {
    transform: translateX(77px);
    background-color: #ffffff;
  }

  .slider:before {
    border-radius: 8px;
  }

  .black,
  .white {
    font-size: 12px;
    position: absolute;
    width: 80px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }

  .black {
    left: 0;
    top: 0;
    right: auto;
    bottom: 0;
  }

  .white {
    right: 0;
    top: 0;
    bottom: 0;
    left: auto;
  }

  .slider + .black {
    color: #ffffff;
  }

  .slider + .black + .white {
    color: #969696;
  }
`;

interface Props {
  current: 'black' | 'white';
  onClick: () => void;
}

export default function Switch({ current, onClick }: Props) {
  return (
    <Container>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={current === 'white'}
          onClick={onClick}
        />
        <span className={styles.slider}></span>
        <span className={styles.black}>Black</span>
        <span className={styles.white}>White</span>
      </label>
    </Container>
  );
}
