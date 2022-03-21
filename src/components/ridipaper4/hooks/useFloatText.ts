import { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { useScrollmagicEffect } from '@/components/ridipaper4/RidiPaper4ScrollmagicContext';

type FloatTextOptions = Partial<{
  height: number,
  duration: number | string,
  hook: number,
  additionalTransform: string,
}>;

export const useFloatText = <T extends HTMLElement>(
  triggerRef: RefObject<HTMLElement>,
  options: FloatTextOptions = {}
) => {
  const textRef = useRef<T>(null);
  const transformSuffix = options.additionalTransform ? ` ${options.additionalTransform}` : '';
  
  useEffect(() => {
    textRef.current!.style.opacity = '0';
    textRef.current!.style.transform =
      `translate(0, ${(options.height ?? 100).toFixed(2)}px)${transformSuffix}`
  }, []);
  
  useScrollmagicEffect((controller, Scene) => {
    new Scene({
      triggerElement: triggerRef.current!,
      triggerHook: options.hook ?? 0.2,
      duration: options.duration ?? 100,
    })
      .on('progress', (e: { progress: number }) => {
        const transition = Math.min(e.progress / 0.2, 1)
        textRef.current!.style.opacity = transition.toFixed(2);
        textRef.current!.style.transform =
          `translate(0, ${((1 - transition) * (options.height ?? 100)).toFixed(2)}px)`
          + transformSuffix;
      })
      .addTo(controller);
  }, [ options.height, options.duration, options.hook, transformSuffix ]);
  
  return textRef;
};
