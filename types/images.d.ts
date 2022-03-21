declare module '*.inline.svg' {
  import React from 'react';
  const component: React.ComponentType<React.SVGProps<SVGElement>>;
  export = component;
}

declare module '*.png' {
  const url: string;
  export = url;
}

declare module '*.jpg' {
  const url: string;
  export = url;
}

declare module '*.svg' {
  const url: string;
  export = url;
}
