import { Animation } from '@/utils/animation';
import { FeatureKeyframes } from '../types';

export const AnimationVertical: Animation<FeatureKeyframes> = {
  duration: 2000,
  keyframes: [
    [0, { name: 'RidiPaper/Rotation', value: 0 }],
    [0, { name: 'Text/Rotation', value: 0 }],
    [0.2, { name: 'Text/Opacity', value: 1 }],
    [0.2, { name: 'TextLandscape/Opacity', value: 0 }],
    [0.25, { name: 'RidiPaper/Rotation', value: 90 }],
    [0.25, { name: 'Text/Rotation', value: 90 }],
    [0.3, { name: 'Text/Opacity', value: 0 }],
    [0.3, { name: 'TextLandscape/Opacity', value: 1 }],
    [0.575, { name: 'RidiPaper/Rotation', value: 90 }],
    [0.575, { name: 'Text/Rotation', value: 90 }],
    [0.575, { name: 'Text/Opacity', value: 0 }],
    [0.575, { name: 'TextLandscape/Opacity', value: 1 }],
    [0.75, { name: 'RidiPaper/Rotation', value: 0 }],
    [0.75, { name: 'Text/Rotation', value: 0 }],
    [0.875, { name: 'Text/Opacity', value: 1 }],
    [0.875, { name: 'TextLandscape/Opacity', value: 0 }],
  ]
};
