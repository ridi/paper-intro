import React from 'react';

import { Controller, Scene } from 'scrollmagic';

const ScrollmagicContext = React.createContext<Controller | undefined>(undefined);
export const ScrollmagicProvider = ScrollmagicContext.Provider;

export function useScrollmagicEffect(callback: (controller: Controller, scene: typeof Scene) => void, extraDeps: any[] = []) {
  const controller = React.useContext(ScrollmagicContext);
  React.useEffect(() => {
    if (controller == null) {
      return;
    }

    let destroyed = false;
    import('scrollmagic').then(({ Scene }) => {
      if (destroyed) {
        return;
      }
      callback(controller, Scene);
    });
    return () => {
      destroyed = true;
    };
  }, [controller, ...extraDeps]);
}
