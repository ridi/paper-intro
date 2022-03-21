import { FixedObject, FluidObject } from 'gatsby-image';
import { Keyframe } from '@/utils/animation';

export type FeaturesDiscreteKeyframeNames =
  | 'Text/Size'
  | 'Touch/Mode'
  | 'Touch/Touch'
  | 'SizeUI/Size'
  | 'Title/Text';

export type FeatureContinuousKeyframeNames =
  | 'Book/Opacity'
  | 'Text/Rotation'
  | 'Text/Opacity'
  | 'TextBackground/Temperature'
  | 'TextBackground/Brightness'
  | 'TextLandscape/Opacity'
  | 'RidiPaper/Rotation'
  | 'RidiPaper/Opacity'
  | 'Touch/Y'
  | 'Touch/Opacity'
  | 'SizeUI/Opacity'
  | 'Title/Transition'
  | 'Snap';

export type FeatureKeyframes = Keyframe<FeaturesDiscreteKeyframeNames, FeatureContinuousKeyframeNames>;

export type ImageQueryResponse = {
  image: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
};

export type ImageFixedQueryResponse = {
  image: {
    childImageSharp: {
      fixed: FixedObject
    }
  }
};
