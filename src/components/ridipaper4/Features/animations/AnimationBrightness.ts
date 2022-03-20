import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationBrightness: Animation<FeatureKeyframes> = {
  duration: 1500,
  keyframes: [
    [0, { name: 'Touch/Mode', value: 'one' }],
    [0, { name: 'Touch/Touch', value: 'false' }],
    [0, { name: 'TextBackground/Brightness', value: 98 }],
    [0.2, { name: 'TextBackground/Brightness', value: 88 }],
    [0.25, { name: 'TextBackground/Brightness', value: 88 }],
    [0.25, { name: 'Touch/Opacity', value: 0 }],
    [0.25, { name: 'Touch/Y', value: 70 }],
    [0.25, { name: 'Touch/Touch', value: 'true' }],
    [0.35, { name: 'Touch/Opacity', value: 1 }],
    [0.7, { name: 'Touch/Y', value: 60 }],
    [0.7, { name: 'Touch/Opacity', value: 1 }],
    [0.7, { name: 'TextBackground/Brightness', value: 98 }],
    [0.9, { name: 'Touch/Touch', value: 'false' }],
    [0.9, { name: 'Touch/Opacity', value: 0 }],
    [0.9, { name: 'Touch/Y', value: 60 }],
    [0.9, { name: 'TextBackground/Brightness', value: 98 }],
    [1, { name: 'TextBackground/Brightness', value: 98 }],
  ]
};
