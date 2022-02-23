import styled, { css } from 'astroturf';
import React from 'react';

import productDesktopBlack from '../../assets/images/paper4-teaser/product-desktop-black.png';
import productDesktopWhite from '../../assets/images/paper4-teaser/product-desktop-white.png';

import TitleWhite from '../../svgs/paper4-title.white.inline.svg';
import TitleBlack from '../../svgs/paper4-title.black.inline.svg';

import Header from './Header';
import Dots from './Dots';

import { useScrollmagicEffect } from '../ScrollmagicContext';

const Container = styled.div`
  position: relative;
`;

const SceneBody = styled<'div', { state: string; background: string }>('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.5s, opacity 0.5s;

  &.state-before {
    opacity: 0;
  }

  &.state-current {
    opacity: 1;
  }

  &.state-after {
    opacity: 0;
  }

  &.background-black {
    background-color: #000000;
  }

  &.background-white {
    background-color: #ffffff;
  }
`;

const ScreenContainer = styled<'div', { state: string }>('div')`
  opacity: 0;

  &.state-current {
    animation: screen 0.3s;
    animation-fill-mode: forwards;
  }

  &.state-after {
    opacity: 0;
    transition: none;
  }

  @keyframes screen {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SubTitle = styled<'span', { black?: boolean }>('span')`
  display: block;
  width: 100%;

  margin-bottom: 22px;

  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 48px;

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
  bottom: 47px;
  margin: 0 auto;

  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 48px;

  text-align: center;

  color: #ffffff;

  &.black {
    color: #000000;
  }
`;

const Trigger = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const PinTarget = styled<'div', { black?: boolean }>('div')`
  position: sticky;
  top: 0;
  width: 100% !important;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  word-break: keep-all;

  transition: background-color 0.5s;

  &.black {
    background-color: #151515;
    transition-delay: 0.5s;
  }
`;

const styles = css`
  .image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    max-width: 80%;
  }

  .title {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 402px;
    height: 116px;
  }
`;

interface Props {}

const SCENE_DURATION = 600;
const SCENE_COUNT = 2;

interface SceneItem {
  animation?: React.ComponentType<{ state: 'before' | 'current' | 'after' }>;
}

interface BodyProps {
  state: 'before' | 'current' | 'after';
}

const scenes: SceneItem[] = [
  {
    animation: function BodyComponent(props: BodyProps) {
      return (
        <SceneBody state={props.state} background="black">
          <Header state={props.state} type="black" />
          <ScreenContainer state={props.state}>
            <img
              src={productDesktopBlack}
              alt="페이퍼4세대 블랙"
              className={styles.image}
            />
            <div className={styles.title}>
              <SubTitle>Simple Reading, Simple Living</SubTitle>
              <TitleWhite />
            </div>
            <Description>예약 판매 3월 24일부터</Description>
            <Dots type="black" />
          </ScreenContainer>
        </SceneBody>
      );
    },
  },
  {
    animation: function BodyComponent(props: BodyProps) {
      return (
        <SceneBody state={props.state} background="white">
          <Header state={props.state} type="white" />
          <ScreenContainer state={props.state}>
            <img
              src={productDesktopWhite}
              alt="페이퍼4세대 화이트"
              className={styles.image}
            />
            <div className={styles.title}>
              <SubTitle black>Simple Reading, Simple Living</SubTitle>
              <TitleBlack />
            </div>
            <Description black>예약 판매 3월 24일부터</Description>
            <Dots type="white" />
          </ScreenContainer>
        </SceneBody>
      );
    },
  },
];

export default function Body(props: Props) {
  const pinRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [phase, setPhase] = React.useState(-1);

  useScrollmagicEffect((controller, Scene) => {
    // IE only
    const pinStyle = window.getComputedStyle(pinRef.current!);
    if (pinStyle.position !== 'sticky') {
      new Scene({
        triggerElement: triggerRef.current!,
        triggerHook: 'onLeave',
        duration: SCENE_DURATION * SCENE_COUNT,
      })
        .setPin(pinRef.current!, { pushFollowers: false })
        .addTo(controller);
    }

    Array.from({ length: SCENE_COUNT }).forEach((_, idx) => {
      new Scene({
        triggerElement: triggerRef.current!,
        triggerHook: 'onLeave',
        offset: idx * SCENE_DURATION,
      })
        .on('enter', () => setPhase(phase => phase + 1))
        .on('leave', () => setPhase(phase => phase - 1))
        .addTo(controller);
    });
  });

  return (
    <Container>
      <Trigger ref={triggerRef} />
      <PinTarget ref={pinRef}>
        {scenes.map(({ animation: Animation }, idx) => {
          if (Animation == null) {
            return null;
          }
          let state: 'before' | 'current' | 'after' = 'before';
          if (phase === idx) {
            state = 'current';
          } else if (phase > idx) {
            state = 'after';
          }
          return <Animation key={idx} state={state} />;
        })}
      </PinTarget>
      <div style={{ height: `${SCENE_DURATION * SCENE_COUNT}px` }} />
    </Container>
  );
}
