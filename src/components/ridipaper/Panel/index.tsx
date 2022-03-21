import styled from 'astroturf';
import React from 'react';

import { useScrollmagicEffect } from '@/components/ridipaper/RidiPaperScrollMagicContext';

import PanelAnimation from './PanelAnimation';

const Title = styled.h2`
  @media (max-width: 1000px) {
    font-size: 32px;
    line-height: 48px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 150px auto 0;
  padding-left: 100px;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1000px) {
    display: block;
    margin-top: 50px;
    padding: 0 60px;
  }

  @media (max-width: 600px) {
    padding: 0 30px;
  }

  h3 {
    font-size: 40px;
    line-height: 50px;

    @media (max-width: 1000px) {
      font-size: 28px;
      line-height: 38px;
    }

    & + p {
      margin-top: 30px;

      @media (max-width: 1000px) {
        margin-top: 20px;
        font-size: 18px;
      }
    }
  }
`;

const PanelPadding = styled.div`
  width: calc(100vw - 480px);
  max-width: 670px;
  padding-right: 30px;

  @media (max-width: 1000px) {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 30px;
  }

  @media (max-width: 360px) {
    max-width: 640px;
    padding: 0;
  }
`;

const Description = styled<'div', { runAnimation?: boolean }>('div')`
  @media (max-width: 1000px) {
    margin-top: 80px;
    text-align: center;
  }

  > section {
    transform: translateY(60px);
    opacity: 0;

    transition: transform 0.5s, opacity 0.5s;

    & + section {
      margin-top: 120px;

      @media (max-width: 1000px) {
        margin-top: 50px;
      }
    }

    &:nth-child(2) {
      transition-delay: 0.2s;
    }
  }

  &.runAnimation > section {
    transform: translateY(0);
    opacity: 1;
  }
`;

export default function Panel() {
  const [runAnimation, setRunAnimation] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  useScrollmagicEffect((controller, Scene) => {
    new Scene({
      triggerElement: panelRef.current!,
      triggerHook: 'onEnter',
      reverse: false,
      offset: 150,
    })
      .on('enter', () => {
        setRunAnimation(true);
      })
      .addTo(controller);
  });

  return (
    <section>
      <Title>완벽한 독서 경험</Title>
      <Container>
        <PanelPadding>
          <PanelAnimation runAnimation={runAnimation} innerRef={panelRef} />
        </PanelPadding>
        <Description runAnimation={runAnimation}>
          <section>
            <h3>보다 더 선명한<br />화면을 구현하다</h3>
            <p>
              빛 투과율이 극대화된{' '}
              <strong>{'글래스\xa0터치\xa0패널'}</strong>,<br />
              그리고 더 얇아진{' '}
              <strong>{'프론트라이트\xa0패널'}</strong>이<br />
              텍스트를 선명하게 표현합니다.
            </p>
          </section>
          <section>
            <h3>얇지만 더 견고해진<br />메탈 프레임</h3>
            <p>
              원형 펀치홀 <strong>{'메탈\xa0프레임'}</strong>이<br />
              리디페이퍼를 더 가볍게<br />
              하지만 더 단단하게 보호해줍니다.
            </p>
          </section>
        </Description>
      </Container>
    </section>
  );
}
