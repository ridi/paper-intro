import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationTemperature: Animation<FeatureKeyframes> = {
  duration: 1500,
  keyframes: [
    [0, { name: 'Touch/Mode', value: 'two' }],
    [0, { name: 'Touch/Opacity', value: 0 }],
    [0, { name: 'Touch/Touch', value: 'false' }],
    [0, { name: 'Touch/Y', value: 70 }],
    [0, { name: 'TextBackground/Brightness', value: 98 }],
    [0, { name: 'TextBackground/Temperature', value: 0 }],
    [0.2, { name: 'Touch/Touch', value: 'true' }],
    [0.2, { name: 'Touch/Opacity', value: 1 }],
    [0.7, { name: 'Touch/Y', value: 60 }],
    [0.7, { name: 'Touch/Opacity', value: 1 }],
    [0.7, { name: 'TextBackground/Brightness', value: 88 }],
    [0.7, { name: 'TextBackground/Temperature', value: 60 }],
    [0.9, { name: 'Touch/Opacity', value: 0 }],
    [0.9, { name: 'Touch/Touch', value: 'false' }],
    [0.9, { name: 'TextBackground/Temperature', value: 60 }],
    [0.9, { name: 'TextBackground/Brightness', value: 88 }],
    [1, { name: 'TextBackground/Temperature', value: 0 }],
    [1, { name: 'TextBackground/Brightness', value: 98 }],
  ]
};
