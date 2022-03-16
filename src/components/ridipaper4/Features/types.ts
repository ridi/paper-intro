import { FluidObject } from 'gatsby-image';
import { Keyframe } from '@/utils/animation';

export type FeaturesDiscreteKeyframeNames =
  | 'Text/Size'
  | 'Touch/Mode'
  | 'SizeUI/Size'

export type FeatureContinuousKeyframeNames =
  | 'Book/Opacity'
  | 'Text/Opacity'
  | 'TextBackground/Temperature'
  | 'TextBackground/Brightness'
  | 'TextLandscape/Opacity'
  | 'RidiPaper/Rotation'
  | 'RidiPaper/Opacity'
  | 'Touch/Touch'
  | 'Touch/Y'
  | 'Touch/Opacity'
  | 'SizeUI/Opacity'

export type FeatureKeyframes = Keyframe<FeaturesDiscreteKeyframeNames, FeatureContinuousKeyframeNames>;

export type ImageQueryResponse = {
  image: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
};
