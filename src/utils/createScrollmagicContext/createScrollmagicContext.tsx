import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import { Controller, Scene } from 'scrollmagic';
import { ReactNode } from 'react';

// Temporal workaround for the issue that the effect is using wrong context between split chunk boundaries
export type ScrollmagicContextType = { controller: Controller, Scene: typeof Scene };
export const createScrollmagicContext = () => {
  const ScrollmagicContext = createContext<ScrollmagicContextType | undefined>(undefined);
  const ScrollmagicProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [scrollmagic, setScrollmagic] = useState<ScrollmagicContextType>();
    
    useEffect(() => {
      let controller: Controller;
      let destroyed = false;
      import('scrollmagic').then(({ Controller, Scene }) => {
        if (destroyed) {
          return;
        }
        
        controller = new Controller();
        setScrollmagic({ controller, Scene });
      });

      return () => {
        if (scrollmagic?.controller) {
          scrollmagic.controller.destroy();
        }
        
        setScrollmagic(undefined);
        destroyed = true;
      };
    }, []);
    
    return (
      <ScrollmagicContext.Provider value={scrollmagic}>
        {children}
      </ScrollmagicContext.Provider>
    );
  };

  function useScrollmagicEffect(callback: (controller: Controller, scene: typeof Scene) => void, extraDeps: any[] = []) {
    const scrollmagic = useContext(ScrollmagicContext);
    useEffect(() => {
      if (!scrollmagic) {
        return;
      }
      
      callback(scrollmagic.controller, scrollmagic.Scene);
    }, [scrollmagic, ...extraDeps]);
  }
  
  return { useScrollmagicEffect, ScrollmagicProvider };
};
