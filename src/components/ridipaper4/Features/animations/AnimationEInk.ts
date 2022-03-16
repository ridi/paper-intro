import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationEInk: Animation<FeatureKeyframes> = {
  duration: 1000,
  keyframes: [
    [0, { name: 'Book/Opacity', value: 0 }],
    [0, { name: 'RidiPaper/Opacity', value: 1 }],
    [100, { name: 'Book/Opacity', value: 1 }],
    [100, { name: 'RidiPaper/Opacity', value: 0 }],
    [800, { name: 'Book/Opacity', value: 0 }],
    [800, { name: 'RidiPaper/Opacity', value: 1 }],
  ]
};
