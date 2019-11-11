declare module '*.svg' {
  import React from 'react';
  const component: React.ComponentType<React.SVGProps<SVGElement>>;
  export = component;
}
