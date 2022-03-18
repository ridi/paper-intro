import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationVertical: Animation<FeatureKeyframes> = {
  duration: 2000,
  keyframes: [
    [0, { name: 'RidiPaper/Rotation', value: 0 }],
    [0, { name: 'Text/Rotation', value: 0 }],
    [0.125, { name: 'RidiPaper/Rotation', value: 90 }],
    [0.125, { name: 'Text/Rotation', value: 90 }],
    [0.275, { name: 'Text/Opacity', value: 1 }],
    [0.275, { name: 'TextLandscape/Opacity', value: 0 }],
    [0.4, { name: 'Text/Opacity', value: 0 }],
    [0.4, { name: 'TextLandscape/Opacity', value: 1 }],
    [0.6, { name: 'RidiPaper/Rotation', value: 90 }],
    [0.6, { name: 'Text/Rotation', value: 90 }],
    [0.75, { name: 'RidiPaper/Rotation', value: 0 }],
    [0.75, { name: 'Text/Rotation', value: 0 }],
    [0.75, { name: 'Text/Opacity', value: 0 }],
    [0.75, { name: 'TextLandscape/Opacity', value: 1 }],
    [0.875, { name: 'Text/Opacity', value: 1 }],
    [0.875, { name: 'TextLandscape/Opacity', value: 0 }],
  ]
};
