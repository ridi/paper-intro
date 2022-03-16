import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationScale: Animation<FeatureKeyframes> = {
  duration: 2500,
  keyframes: [
    [0, { name: 'Text/Size', value: 'size-5' }],
    [0, { name: 'SizeUI/Size', value: 'size-5' }],
    [0, { name: 'SizeUI/Opacity', value: 0 }],
    [0, { name: 'Touch/Opacity', value: 0 }],
    [0, { name: 'Touch/Mode', value: 'scale' }],
    [100, { name: 'SizeUI/Opacity', value: 1 }],
    [100, { name: 'Touch/Opacity', value: 1 }],
    [100, { name: 'Touch/Touch', value: 0 }],
    [400, { name: 'Touch/Touch', value: 1 }],
    [400, { name: 'Text/Size', value: 'size-6' }],
    [400, { name: 'SizeUI/Size', value: 'size-6' }],
    [700, { name: 'Touch/Touch', value: 0 }],
    [900, { name: 'Touch/Touch', value: 0 }],
    [1200, { name: 'Touch/Touch', value: 1 }],
    [1200, { name: 'Text/Size', value: 'size-7' }],
    [1200, { name: 'SizeUI/Size', value: 'size-7' }],
    [1500, { name: 'Touch/Touch', value: 0 }],
    [1700, { name: 'Touch/Touch', value: 0 }],
    [2000, { name: 'Touch/Touch', value: 1 }],
    [2000, { name: 'Text/Size', value: 'size-8' }],
    [2000, { name: 'SizeUI/Size', value: 'size-8' }],
    [2300, { name: 'Touch/Touch', value: 0 }],
  ]
};
