import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationBrightness: Animation<FeatureKeyframes> = {
  duration: 1000,
  keyframes: [
    [0, { name: 'TextBackground/Brightness', value: 221 }],
    [100, { name: 'TextBackground/Brightness', value: 185 }],
    [800, { name: 'TextBackground/Brightness', value: 221 }]
  ]
};
