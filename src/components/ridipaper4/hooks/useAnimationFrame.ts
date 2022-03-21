import { useEffect, useRef } from 'react';

export const useAnimationFrame = (callback: () => void): void => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  
  useEffect(() => {
    let requestId: number;
    const onAnimationFrame = () => {
      callbackRef.current();
      requestId = requestAnimationFrame(onAnimationFrame);
    };
    
    onAnimationFrame();
    return () => cancelAnimationFrame(requestId);
  }, []);
};
