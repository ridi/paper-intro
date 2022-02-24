import styled, { css } from 'astroturf';
import React from 'react';

import productMobileBlack from '../../assets/images/paper4-teaser/product-mobile-black.png';
import productMobileWhite from '../../assets/images/paper4-teaser/product-mobile-white.png';

import TitleWhite from '../../svgs/paper4-title.white.inline.svg';
import TitleBlack from '../../svgs/paper4-title.black.inline.svg';

import Header from './Header';
import Switch from './Switch';

const Container = styled.div`
  position: relative;
`;

const SceneBody = styled<'div', { background: string }>('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transition: background-color 0.5s, opacity 0.5s;

  &.background-black {
    background-color: #000000;
  }

  &.background-white {
    background-color: #ffffff;
  }
`;

const SubTitle = styled<'span', { black?: boolean }>('span')`
  display: block;
  width: 100%;

  margin-bottom: 22px;

  font-style: normal;
  font-weight: normal;
  font-size: 12px;

  text-align: center;

  color: #ffffff;

  &.black {
    color: #000000;
  }
`;

const Description = styled<'span', { black?: boolean }>('span')`
  display: block;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;

  text-align: center;

  color: #ffffff;

  &.black {
    color: #000000;
  }
`;

const styles = css`
  .background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }

  .title {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 227px;
    height: 164px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .svgTitle {
    width: 214px;
  }
`;

interface Props {}

export default function MobileBody(props: Props) {
  const [type, setType] = React.useState<'black' | 'white'>('black');
  const isBlack = type === 'black';
  return (
    <Container>
      <SceneBody background={type}>
        <div
          style={{
            backgroundImage: `url(${
              isBlack ? productMobileBlack : productMobileWhite
            })`,
          }}
          className={styles.background}
        />
        <Header type={type} state="current" />
        <div className={styles.title}>
          <SubTitle black={!isBlack}>Simple Reading, Simple Living</SubTitle>
          {!isBlack ? (
            <TitleBlack className={styles.svgTitle} />
          ) : (
            <TitleWhite className={styles.svgTitle} />
          )}
          <Description black={!isBlack}>예약 판매 3월 24일부터</Description>
        </div>
        <Switch
          onClick={() => {
            setType(type === 'black' ? 'white' : 'black');
          }}
          current={type}
        />
      </SceneBody>
    </Container>
  );
}
