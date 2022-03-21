import styled from 'astroturf';
import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import IconClose from '@/svgs/ridipaper4/close.inline.svg';
import React from 'react';
import { MouseEvent, ReactNode, RefObject } from 'react';

const LightboxBackdrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity .4s ease;
  touch-action: none;
  z-index: 9;
  
  &[data-is-opened="false"] {
    opacity: 0;
  }
`;

const LightboxContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  touch-action: auto;
`;

const LightboxClose = styled('button')`
  position: absolute;
  top: -30px;
  right: -40px;
  color: #ffffff;
`;

const LightboxCloseIcon = styled(IconClose)`
  width: 20px;
  height: 20px;
`;

const LightboxContext = createContext<RefObject<HTMLDivElement> | null>(null);
export const LightboxContextProvider = LightboxContext.Provider;

type LightboxProps = {
  isOpened: boolean,
  onClose: () => void,
  className?: string;
  closeClassName?: string;
  children?: ReactNode,
};

export const Lightbox = ({ isOpened, onClose, className, closeClassName, children }: LightboxProps) => {
  const portal = useContext(LightboxContext);
  const [flushedState, setFlushedState] = useState(isOpened);
  
  useEffect(() => {
    if (isOpened === true) {
      const animationFrame = requestAnimationFrame(() => setFlushedState(true));
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isOpened]);
  
  const onTransitionEnd = () => {
    setFlushedState(isOpened);
  };
  
  const onClickBackdrop = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Prevent Scroll
  // > for iOS, touch-action: none will work
  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    if (isOpened) {
      document.documentElement.style.overflow = 'hidden';

      return () => { document.documentElement.style.overflow = previousOverflow; };
    }
  }, [isOpened]);
  
  if (!flushedState && !isOpened) {
    return <></>;
  }
  
  if (!portal?.current) {
    onClose();
    return <></>;
  }

  return createPortal(
    <LightboxBackdrop
      className={className}
      onClick={onClickBackdrop}
      onTransitionEnd={onTransitionEnd}
      data-is-opened={isOpened && flushedState}
    >
      <LightboxContainer role="dialog">
        <LightboxClose type="button" className={closeClassName} onClick={onClose}>
          <LightboxCloseIcon />
        </LightboxClose>
        {children}
      </LightboxContainer>
    </LightboxBackdrop>,
    portal.current
  );
};
