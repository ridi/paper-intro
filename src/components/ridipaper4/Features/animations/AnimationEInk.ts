import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationEInk: Animation<FeatureKeyframes> = {
  duration: 1500,
  keyframes: [
    [0.13, { name: 'Book/Opacity', value: 1 }],
    [0.13, { name: 'RidiPaper/Opacity', value: 0 }],
    [0.33, { name: 'Book/Opacity', value: 1 }],
    [0.33, { name: 'RidiPaper/Opacity', value: 0 }],
    [0.33, { name: 'Snap', value: 0 }],
    [0.8, { name: 'Book/Opacity', value: 0 }],
    [0.8, { name: 'RidiPaper/Opacity', value: 1 }],
    [0.8, { name: 'Snap', value: 1 }],
  ]
};
