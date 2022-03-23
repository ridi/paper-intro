import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useEffect, useRef, useState } from 'react';
import { useScrollmagicEffect } from '@/components/ridipaper4/RidiPaper4ScrollmagicContext';
import QuickMenuBackIcon from '@/svgs/ridipaper4/quickmenu-back.inline.svg';
import QuickMenuBluetoothIcon from '@/svgs/ridipaper4/quickmenu-bluetooth.inline.svg';
import QuickMenuFrontlightIcon from '@/svgs/ridipaper4/quickmenu-frontlight.inline.svg';
import QuickMenuRefreshIcon from '@/svgs/ridipaper4/quickmenu-refresh.inline.svg';
import QuickMenuRotationlockIcon from '@/svgs/ridipaper4/quickmenu-rotationlock.inline.svg';
import QuickMenuSwitchIcon from '@/svgs/ridipaper4/quickmenu-switch.inline.svg';
import QuickMenuTouchlockIcon from '@/svgs/ridipaper4/quickmenu-touchlock.inline.svg';
import QuickMenuWifiIcon from '@/svgs/ridipaper4/quickmenu-wifi.inline.svg';
import React from 'react';
import { LineBreakOnDesktop } from '@/components/ridipaper4/LineBreak';

const MenuContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: 30%;

  @media (max-width: 600px) {
    margin-right: 0;
    width: 80%;
    max-width: 300px;
  }
`;

const MenuTitle = styled('h2')`
  color: #121212;
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  text-align: start;

  @media (max-width: 600px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const MenuDescription = styled('p')`
  margin-top: 57px;
  color: #000000;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  opacity: 0.6;

  @media (max-width: 600px) {
    font-size: 12px;
    line-height: 20px;
    margin-top: 20px;
  }
`;

const MenuRows = styled('div')`
  display: flex;
  flex-direction: column;
`;

const MenuRow = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;

  @media (max-width: 600px) {
    margin-top: 12px;
  }
`;

const ItemContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000000;
  min-width: 70px;

  @media (max-width: 600px) {
    min-width: 60px;
  }
`;

const ItemIconContainer = styled('i')`
  font-size: 60px;
  margin-bottom: 4px;

  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const ItemTitle = styled('span')`
  font-size: 12px;
  line-height: 36px;
  white-space: nowrap;
  text-align: center;
  opacity: 0.6;

  @media (max-width: 600px) {
    font-size: 9px;
  }
`;

const icons = [
  [
    { key: 'refresh', component: QuickMenuRefreshIcon, text: '새로고침' },
    {
      key: 'frontlight',
      component: QuickMenuFrontlightIcon,
      text: '밝기 조절',
    },
    { key: 'wifi', component: QuickMenuWifiIcon, text: 'Wi-Fi' },
    { key: 'bluetooth', component: QuickMenuBluetoothIcon, text: '블루투스' },
  ],
  [
    { key: 'back', component: QuickMenuBackIcon, text: '뒤로가기' },
    {
      key: 'rotationlock',
      component: QuickMenuRotationlockIcon,
      text: '회전 잠금',
    },
    { key: 'switch', component: QuickMenuSwitchIcon, text: '넘김 버튼 전환' },
    { key: 'touchlock', component: QuickMenuTouchlockIcon, text: '터치 잠금' },
  ],
];

const QuickButtonMenu = (): JSX.Element => (
  <MenuContainer>
    <MenuTitle>
      다양한 기능을
      <br />퀵 버튼 하나로 간단하게
    </MenuTitle>
    <MenuDescription>
      퀵 버튼을 통해 더 손쉽게 <LineBreakOnDesktop />
      조절해보세요.
    </MenuDescription>

    <MenuRows>
      {icons.map((row, index) => (
        <MenuRow key={index}>
          {row.map(({ key, component: IconComponent, text }) => (
            <ItemContainer key={key}>
              <ItemIconContainer>
                <IconComponent />
              </ItemIconContainer>
              <ItemTitle>{text}</ItemTitle>
            </ItemContainer>
          ))}
        </MenuRow>
      ))}
    </MenuRows>
  </MenuContainer>
);

const videoQuery = graphql`
  query VideoQuery {
    quickButtonWebm: file(relativePath: { eq: "images/ridipaper4/quick-button/quick-button.webm" }) {
      publicURL
    }

    quickButtonMp4: file(relativePath: { eq: "images/ridipaper4/quick-button/quick-button.mp4" }) {
      publicURL
    }
    
    quickButtonMobileWebm: file(relativePath: { eq: "images/ridipaper4/quick-button/quick-button-mobile.webm" }) {
      publicURL
    }

    quickButtonMobileMp4: file(relativePath: { eq: "images/ridipaper4/quick-button/quick-button-mobile.mp4" }) {
      publicURL
    }
  }
`;

const QuickButtonContainer = styled('section')`
  background: #c8c8c8;
  height: 100vh;

  @media (max-width: 600px) {
    height: auto;
    min-height: 100vh;
  }
`;

const QuickButtonStage = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 600px) {
    align-items: flex-start;
    padding-top: 78px;
  }
`;

const QuickButtonVideo = styled('video')`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: auto;
  background: #c8c8c8;
  transform: translate(-50%, 0);
`;

const LineWrapper = styled('div')`
  position: absolute;
  width: 100%;
  height: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(200, 200, 200, 1) 80%, rgba(200, 200, 200, 0));

  user-select: none;
  pointer-events: none;

  margin-bottom: calc(56.25vw - 20px);

  @media (max-width: 600px) {
    margin-bottom: 177.78vw;
  }
`;

const DummyArea = styled('div')`
  display: none;
  width: 1px;
  height: 150vw;
  min-height: 100vh;

  @media (max-width: 600px) {
    display: inline-block;
  }
`;

export const QuickButton = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { quickButtonWebm, quickButtonMp4, quickButtonMobileWebm, quickButtonMobileMp4 } = useStaticQuery<{
    quickButtonWebm: { publicURL: string };
    quickButtonMp4: { publicURL: string };
    quickButtonMobileWebm: { publicURL: string };
    quickButtonMobileMp4: { publicURL: string };
  }>(videoQuery);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    onResize();
    
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useScrollmagicEffect((controller, Scene) => {
    new Scene({
      triggerElement: containerRef.current!,
      triggerHook: 1,
    })
      .on('enter', () => {
        videoRef.current?.play();
      })
      .addTo(controller);
  });

  return (
    <QuickButtonContainer ref={containerRef}>
      <QuickButtonStage>
        <DummyArea />
        { isMobile ? (
            <QuickButtonVideo ref={videoRef} key="mobile" playsInline muted>
              <source src={quickButtonMobileWebm.publicURL} type="video/webm" />
              <source src={quickButtonMobileMp4.publicURL} type="video/mp4" />
            </QuickButtonVideo>
          ) : (
            <QuickButtonVideo ref={videoRef} key="desktop" playsInline muted>
              <source src={quickButtonWebm.publicURL} type="video/webm" />
              <source src={quickButtonMp4.publicURL} type="video/mp4" />
            </QuickButtonVideo>
          ) }
        <LineWrapper />
        <QuickButtonMenu />
      </QuickButtonStage>
    </QuickButtonContainer>
  );
};
