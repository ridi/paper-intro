import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationTransition = (text: string): Animation<FeatureKeyframes> => ({
  duration: 50,
  keyframes: [
    [-4, { name: 'Title/Transition', value: 0 }],
    [0, { name: 'Title/Transition', value: 1 }],
    [0, { name: 'Title/Text', value: text }],
    [0, { name: 'Title/Transition', value: -1 }],
    [4, { name: 'Title/Transition', value: 0 }],
  ]
});
