import styled from 'astroturf';
import React from 'react';
import { Controller } from 'scrollmagic';

import { graphql, useStaticQuery } from 'gatsby';

import AnimationPage from './AnimationPage';
import AnimationViewerSettings from './AnimationViewerSettings';
import FeatureView from './FeatureView';
import FeatureText from './FeatureText';
import PaperDeviceContainer from './PaperDeviceContainer';
import Screen from './Screen';

const Container = styled.div`
  position: relative;
`;

const Trigger = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const PinTarget = styled<'div', { dark?: boolean }>('div')`
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

  &.dark {
    background-color: #151515;
    transition-delay: 0.5s;
  }
`;

const FeatureTextContainer = styled.div`
  position: relative;
  width: 50%;
  height: 214px;

  @media (max-width: 800px) {
    width: 100%;
    height: 184px;
    margin-top: 50px;
  }
`;

const SCENE_DURATION = 800;
const SCENE_COUNT = 5;

interface TextItem {
  heading: string;
  body: string;
  animation?: React.ComponentType<{ state: 'before' | 'current' | 'after' }>;
}

const texts: TextItem[] = [
  {
    heading: '독서에 최적화된\n전자잉크 디스플레이',
    body: '종이책을 보던 느낌 그대로.\n햇빛 반사도, 블루라이트도 없으니\n오래 읽어도 눈이 피로하지 않아요.',
  },
  {
    heading: '더 빠르게\n페이지를 넘기다',
    body: '새로운 웨이브폼 기술 적용으로\n22% 더 빨라진 페이지 넘김 속도\n이제 부드럽게 독서하세요.',
    animation: AnimationPage,
  },
  {
    heading: '내 마음대로\n조절하는 페이지',
    body: '원하는 글꼴을 선택하고\n글자는 크게, 문단 간격은 여유롭게\n마음대로 페이지를 편집해보세요.',
    animation: AnimationViewerSettings,
  },
  {
    heading: '손가락으로\n빛을 만들어내다',
    body: '한 손가락으로는 밝기 조절\n두 손가락으로는 색온도 조절\n어두운 곳에서도 편안하게 독서하세요.',
  },
  {
    heading: '다양한 부가 기능을\n퀵 버튼 하나로',
    body: '독서를 멈출 필요가 없어요.\n와이파이부터 터치 잠금까지\n퀵 버튼 하나로 조절할 수 있습니다.',
  },
];

export default function Body() {
  const data = useStaticQuery(graphql`
    {
      text1: file(relativePath: {eq: "images/viewer-features/text1.png"}) {
        ...ScreenImage
      }
    }
  `);
  const pinRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    let controller: Controller;
    let destroyed = false;
    import('scrollmagic').then(({ Controller, Scene }) => {
      if (destroyed) {
        return;
      }
      controller = new Controller();

      // IE only
      const pinStyle = window.getComputedStyle(pinRef.current!);
      if (pinStyle.position !== 'sticky') {
        new Scene({
          triggerElement: triggerRef.current!,
          triggerHook: 'onLeave',
          duration: SCENE_DURATION * SCENE_COUNT,
        })
          .setPin(pinRef.current!, {pushFollowers: false})
          .addTo(controller);
      }

      Array.from({ length: SCENE_COUNT - 1 }).forEach((_, idx) => {
        new Scene({
          triggerElement: triggerRef.current!,
          triggerHook: 'onLeave',
          offset: (idx + 1) * SCENE_DURATION,
        })
          .on('enter', () => setPhase(phase => phase + 1))
          .on('leave', () => setPhase(phase => phase - 1))
          .addTo(controller);
      });
    });

    return () => {
      controller && controller.destroy();
      destroyed = true;
    };
  }, []);

  return (
    <Container>
      <Trigger ref={triggerRef} />
      <PinTarget ref={pinRef} dark={phase === 3}>
        <FeatureView totalPhases={SCENE_COUNT} phase={phase}>
          <PaperDeviceContainer>
            <Screen file={data.text1} />
            {texts.map(({ animation: Animation }, idx) => {
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
          </PaperDeviceContainer>
          <FeatureTextContainer>
            {texts.map(({heading, body}, idx) => {
              let state: 'before' | 'current' | 'after' = 'before';
              if (phase === idx) {
                state = 'current';
              } else if (phase > idx) {
                state = 'after';
              }
              return <FeatureText key={idx} state={state} heading={heading} body={body} bright={idx === 3} />;
            })}
          </FeatureTextContainer>
        </FeatureView>
      </PinTarget>
      <div style={{ height: `${SCENE_DURATION * SCENE_COUNT}px` }} />
    </Container>
  );
}
