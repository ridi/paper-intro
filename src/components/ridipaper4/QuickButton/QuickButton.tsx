import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useRef } from 'react';
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
import { PinnedItem } from '@/components/ridipaper4/PinnedItem';

const MenuContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: 30%;
`;

const MenuTitle = styled('h2')`
  color: #121212;
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  text-align: start;
`;

const MenuDescription = styled('p')`
  margin-top: 57px;
  color: #000000;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  opacity: .6;
`;

const MenuRows = styled('div')`
  display: flex;
  flex-direction: column;
`;

const MenuRow = styled('div')`
  display: flex;
  margin-top: 40px;
`;

const ItemContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  color: #000000;
  opacity: .8;
`;

const ItemIconContainer = styled('i')`
  font-size: 60px;
  margin-bottom: 4px;
`;

const ItemTitle = styled('span')`
  font-size: 12px;
  line-height: 36px;
`;

const icons = [
  [
    { key: 'refresh', component: QuickMenuRefreshIcon, text: '새로고침' },
    { key: 'frontlight', component: QuickMenuFrontlightIcon, text: '밝기 조절' },
    { key: 'wifi', component: QuickMenuWifiIcon, text: 'Wi-Fi' },
    { key: 'bluetooth', component: QuickMenuBluetoothIcon, text: '블루투스' },
  ],
  [
    { key: 'back', component: QuickMenuBackIcon, text: '뒤로가기' },
    { key: 'rotationlock', component: QuickMenuRotationlockIcon, text: '회전 잠금' },
    { key: 'switch', component: QuickMenuSwitchIcon, text: '넘김 버튼 전환' },
    { key: 'touchlock', component: QuickMenuTouchlockIcon, text: '터치 잠금' },
  ]
];

const QuickButtonMenu = (): JSX.Element => (
  <MenuContainer>
    <MenuTitle>
      다양한 기능을
      <br />
      퀵 버튼 하나로 간단하게
    </MenuTitle>
    <MenuDescription>
      퀵버튼을 통해 더 손쉽게
      <br />
      조절해보세요.
    </MenuDescription>
    
    <MenuRows>
      { icons.map((row, index) => (
        <MenuRow key={index}>
          { row.map(({ key, component: IconComponent, text }) => (
            <ItemContainer key={key}>
              <ItemIconContainer>
                <IconComponent />
              </ItemIconContainer>
              <ItemTitle>{text}</ItemTitle>
            </ItemContainer>
          )) }
        </MenuRow>
      )) }
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
  }
`;

const QuickButtonContainer = styled('section')`
  background: #c8c8c8;
  height: 100vh;
`;

const QuickButtonStage = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const QuickButtonVideo = styled('video')`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: auto;
  background: #c8c8c8;
  transform: translate(-50%, 0);
  
  @supports (object-fit: contain) {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center bottom;
  }
`;

export const QuickButton = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { quickButtonWebm, quickButtonMp4 } = useStaticQuery<{
    quickButtonWebm: { publicURL: string },
    quickButtonMp4: { publicURL: string }
  }>(videoQuery);
  
  useScrollmagicEffect((controller, Scene) => {
    new Scene({
      triggerElement: containerRef.current!,
      triggerHook: 1,
    })
      .on('enter', () => {
        videoRef.current!.play();
      })
      .addTo(controller);
  });
  
  return (
    <QuickButtonContainer ref={containerRef}>
      <QuickButtonStage>
        <QuickButtonVideo ref={videoRef} playsInline muted>
          <source src={quickButtonWebm.publicURL} type="video/webm" />
          <source src={quickButtonMp4.publicURL} type="video/mp4" />
        </QuickButtonVideo>
        <QuickButtonMenu />
      </QuickButtonStage>
    </QuickButtonContainer>
  );
};
