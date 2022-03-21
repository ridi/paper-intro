import { LegacyRef, MutableRefObject } from 'react'

export const mergeRefs = <T>(refs: (MutableRefObject<T> | LegacyRef<T> | undefined)[]) => {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        const refValue = ref as MutableRefObject<T | null>;
        refValue.current = value;
      }
    });
  };
}
