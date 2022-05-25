import styled from 'astroturf';
import { css } from 'astroturf';
import { useCallback, useEffect, useState } from 'react';
import * as constants from './constants';

import React from 'react';
import { Lightbox } from '@/components/ridipaper4/Lightbox';

const styles = css`
  .close {
    color: #333333;
    top: 15px;
    right: 15px;
  }
`;

const PopupContainer = styled('div')`
  background: #ffffff;
  color: #333333;
  padding: 0 45px;
  padding-top: 60px;
  padding-bottom: 20px;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
  border-radius: 14px;
  overscroll-behavior: contain;
  
  @media (max-width: 600px) {
    width: 90vw;
  }
`;

const PopupTitle = styled('h2')`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: start;
`;

const PopupContent = styled('p')`
  font-size: 15px;
  line-height: 24px;
  white-space: pre-wrap;
  margin-top: 32px;
`;

const DoNotShowToday = styled('button')`
  color: #777777;
  font-size: 12px;
  font-weight: 400;
  line-height: 24px;
  text-decoration: underline;
  margin-top: 52px;
  margin-left: auto;
  display: block;
`;

type PopupProps = {
  title: string;
  content: string;
  popupKey: string;
};

export const Popup = ({ title, content, popupKey }: PopupProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const onClose = useCallback(() => {
    setIsOpened(false);
  }, []);
  
  const localStorageKey = `__paper4_${popupKey}`;
  useEffect(() => {
    const lastShow = localStorage.getItem(localStorageKey);
    if (!lastShow) {
      setIsOpened(true);
      return;
    }
    
    const lastShowParsed = parseInt(lastShow);
    const shouldShow = !(
      typeof lastShowParsed === 'number'
      && Date.now() - lastShowParsed < 24 * 60 * 60 * 1000
    );
    
    setIsOpened(shouldShow);
  }, []);
  
  const onCloseWithDoNotShowToday = useCallback(() => {
    localStorage.setItem(localStorageKey, String(Date.now()));
    onClose();
  }, []);
  
  return (
    <Lightbox isOpened={isOpened} onClose={onClose} closeClassName={styles.close}>
      <PopupContainer>
        <PopupTitle>{title}</PopupTitle>
        <PopupContent>{content}</PopupContent>
        <DoNotShowToday type="button" onClick={onCloseWithDoNotShowToday}>
          하루동안 보지 않기
        </DoNotShowToday>
      </PopupContainer>
    </Lightbox>
  );
};

export const PurchasePopup = () => (
  <Popup title="리디페이퍼 4 일반 판매 일정 안내" content={constants.DELAY_POPUP_CONTENT} popupKey="delay" />
);
