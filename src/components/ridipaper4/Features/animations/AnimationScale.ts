import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationScale: Animation<FeatureKeyframes> = {
  duration: 2000,
  keyframes: [
    [0, { name: 'Text/Size', value: 'size5' }],
    [0, { name: 'SizeUI/Size', value: '5' }],
    [0, { name: 'SizeUI/Opacity', value: 0 }],
    [0, { name: 'Touch/Opacity', value: 0 }],
    [0, { name: 'Touch/Y', value: 49.2 }],
    [0, { name: 'Touch/Mode', value: 'scale' }],
    [0.04, { name: 'SizeUI/Opacity', value: 1 }],
    [0.04, { name: 'Touch/Opacity', value: 1 }],
    [0.04, { name: 'Touch/Touch', value: 'false' }],
    [0.04, { name: 'Snap', value: 1 }],
    [0.16, { name: 'Touch/Touch', value: 'true' }],
    [0.16, { name: 'Text/Size', value: 'size6' }],
    [0.16, { name: 'SizeUI/Size', value: '6' }],
    [0.16, { name: 'Snap', value: 1 }],
    [0.28, { name: 'Touch/Touch', value: 'false' }],
    [0.36, { name: 'Touch/Touch', value: 'false' }],
    [0.48, { name: 'Touch/Touch', value: 'true' }],
    [0.48, { name: 'Text/Size', value: 'size7' }],
    [0.48, { name: 'SizeUI/Size', value: '7' }],
    [0.48, { name: 'Snap', value: 2 }],
    [0.6, { name: 'Touch/Touch', value: 'false' }],
    [0.68, { name: 'Touch/Touch', value: 'false' }],
    [0.8, { name: 'Touch/Touch', value: 'true' }],
    [0.8, { name: 'Text/Size', value: 'size8' }],
    [0.8, { name: 'SizeUI/Size', value: '8' }],
    [0.8, { name: 'Snap', value: 3 }],
    [0.92, { name: 'Touch/Touch', value: 'false' }],
    [1, { name: 'Snap', value: 4 }],
  ]
};
