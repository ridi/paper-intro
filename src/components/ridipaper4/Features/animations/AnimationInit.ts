import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationInit = (text: string): Animation<FeatureKeyframes> => ({
  duration: 200,
  keyframes: [
    [0, { name: 'Text/Opacity', value: 0 }],
    [0, { name: 'RidiPaper/Opacity', value: 0 }],
    [0, { name: 'Title/Transition', value: -1 }],
    [0, { name: 'Title/Text', value: text }],
    [1, { name: 'Text/Opacity', value: 1 }],
    [1, { name: 'RidiPaper/Opacity', value: 1 }],
    [1, { name: 'Title/Transition', value: 0 }],
  ]
});
