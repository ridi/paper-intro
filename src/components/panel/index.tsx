import styled from 'astroturf';
import React from 'react';

import { useScrollmagicEffect } from '../ScrollmagicContext';

import PanelAnimation from './PanelAnimation';

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
  }

  h3 {
    font-size: 40px;
    line-height: 50px;

    & + p {
      margin-top: 30px;
    }
  }
`;

const Description = styled<'div', { runAnimation?: boolean }>('div')`
  > section {
    transform: translateY(60px);
    opacity: 0;

    transition: transform 0.5s, opacity 0.5s;

    & + section {
      margin-top: 120px;
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
      <h2>완벽한 독서 경험</h2>
      <Container>
        <PanelAnimation runAnimation={runAnimation} innerRef={panelRef} />
        <Description runAnimation={runAnimation}>
          <section>
            <h3>{'보다\xa0더\xa0선명한 화면을\xa0구현하다'}</h3>
            <p>
              빛 투과율이 극대화된{' '}
              <strong>{'글래스\xa0터치\xa0패널'}</strong>,<br />
              그리고 더 얇아진{' '}
              <strong>{'프론트라이트\xa0패널'}</strong>이<br />
              텍스트를 선명하게 표현합니다.
            </p>
          </section>
          <section>
            <h3>{'얇지만\xa0더\xa0견고해진 메탈\xa0프레임'}</h3>
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
