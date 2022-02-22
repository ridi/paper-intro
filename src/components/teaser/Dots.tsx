import styled, { css } from 'astroturf';
import React from 'react';

import DotBlackTop from '../../svgs/DotBlackTop.inline.svg';
import DotBlackBottom from '../../svgs/DotBlackBottom.inline.svg';

import DotWhiteTop from '../../svgs/DotWhiteTop.inline.svg';
import DotWhiteBottom from '../../svgs/DotWhiteBottom.inline.svg';

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: auto;
  right: 54px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const styles = css`
  .dot {
    position: relative;
    width: 38px;
    height: 38px;
    cursor: pointer;

    &:last-of-type {
      margin-top: 20px;
    }

    &:hover {
      opacity: 0.5;
    }
  }
`;

interface Props {
  type: 'black' | 'white';
}

export default function Dots(props: Props) {
  const onClickTop = () => {
    window.scrollTo(0, 0);
  };
  const onClickBottom = () => {
    window.scrollTo(0, window.innerHeight);
  };
  return (
    <Container>
      {props.type === 'black' ? (
        <>
          <DotBlackTop className={styles.dot} onClick={onClickTop} />
          <DotBlackBottom className={styles.dot} onClick={onClickBottom} />
        </>
      ) : (
        <>
          <DotWhiteTop className={styles.dot} onClick={onClickTop} />
          <DotWhiteBottom className={styles.dot} onClick={onClickBottom} />
        </>
      )}
    </Container>
  );
}
