import { createContext } from 'react';

import { Timeline } from '@/utils/animation';
import { FeatureContinuousKeyframeNames, FeaturesDiscreteKeyframeNames } from './types';

export const TimelineContext = createContext(null as unknown as Timeline<
  FeaturesDiscreteKeyframeNames,
  FeatureContinuousKeyframeNames
>);

export const TimelineContextProvider = TimelineContext.Provider;
