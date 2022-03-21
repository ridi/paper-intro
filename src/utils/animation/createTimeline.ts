import { Animation, DiscreteKeyframe, Keyframe, Timeline } from './types';

const isDiscreteKeyframe = (keyframe: Keyframe<string, string>): keyframe is DiscreteKeyframe<string> =>
  typeof keyframe.value === 'string';

const findNextKeyframe = <T>(haystack: [number, T][], needle: number, previousIndex: number = 0):
  { index: number, range: [[number, T] | undefined, [number, T] | undefined] } =>
{
  let index = previousIndex;
  while (0 <= index && index < haystack.length) {
    const currentKeyframe = haystack[index];
    const nextKeyframe = haystack[index + 1];
    
    if (!currentKeyframe) {
      // Has no keyframes
      return { index: 0, range: [ undefined, undefined ] };
    }
    
    if (!nextKeyframe) {
      if (currentKeyframe[0] <= needle) {
        // Last keyframe
        index = haystack.length;
        break;
      }
      
      index--;
      continue;
    }
    
    if (needle < currentKeyframe[0]) {
      index--;
      continue;
    }
    
    if (needle >= nextKeyframe[0]) {
      index++;
      continue;
    }
    
    return { index, range: [ currentKeyframe, nextKeyframe ] };
  }
  
  if (index < 0) {
    // Before first keyframe
    return { index: 0, range: [ haystack[0], undefined ] };
  }
  
  // After last keyframe
  return { index: haystack.length - 1, range: [ haystack[haystack.length - 1], undefined ] };
};

export const createTimeline = <
  DiscreteKeyframeNames extends string,
  ContinuousKeyframeNames extends string
>(
  animations: Animation<Keyframe<DiscreteKeyframeNames, ContinuousKeyframeNames>>[]
): Timeline<DiscreteKeyframeNames, ContinuousKeyframeNames> => {
  const discreteTimeline = {} as { [K in DiscreteKeyframeNames]: [number, string][] };
  const continuousTimeline = {} as { [K in ContinuousKeyframeNames]: [number, number][] };
  
  let currentScroll = 0;
  let totalScroll = animations.reduce((duration, animation) => duration + animation.duration, 0);
  
  animations.forEach(animation => {
    animation.keyframes
      .sort(([scrollStampA], [scrollStampB]) => scrollStampA - scrollStampB)
      .forEach(([scrollStamp, keyframe]) => {
        const position = (currentScroll + scrollStamp * animation.duration) / totalScroll;
        
        if (isDiscreteKeyframe(keyframe)) {
          if (!discreteTimeline[keyframe.name]) {
            discreteTimeline[keyframe.name] = [];
          }
          
          discreteTimeline[keyframe.name].push([position, keyframe.value]);
          return;
        }
        
        if (!continuousTimeline[keyframe.name]) {
          continuousTimeline[keyframe.name] = [];
        }
        
        continuousTimeline[keyframe.name].push([position, keyframe.value]);
      });
    
    currentScroll += animation.duration;
  });
  
  type SubscribeFn = (value: number | string) => void;
  const subscribedMap: Map<ContinuousKeyframeNames | DiscreteKeyframeNames, SubscribeFn> = new Map();
  const lastIndex: Map<ContinuousKeyframeNames | DiscreteKeyframeNames, number> = new Map();
  
  return {
    subscribe(key, fn) {
      subscribedMap.set(key, fn as SubscribeFn);
    },
    
    unsubscribe(key) {
      subscribedMap.delete(key);
    },
    
    update(value) {
      subscribedMap.forEach((onUpdate, key) => {
        if (key in discreteTimeline) {
          const { index: nextIndex, range: [ start ] } = findNextKeyframe(
            discreteTimeline[key as DiscreteKeyframeNames],
            value,
            lastIndex.get(key) ?? 0
          );
          
          lastIndex.set(key, nextIndex);
          
          if (!start) {
            // Has no keyframes
            return;
          }
          
          onUpdate(start[1]);
        } else if (key in continuousTimeline) {
          const { index: nextIndex, range: [ start, end ] } = findNextKeyframe(
            continuousTimeline[key as ContinuousKeyframeNames],
            value,
            lastIndex.get(key) ?? 0
          );
          
          lastIndex.set(key, nextIndex);
          
          if (!start) {
            // Has no keyframes
            return;
          }
          
          if (!end) {
            // Final keyframe
            onUpdate(start[1]);
            return;
          }
          
          // Interpolate
          const length = end[0] - start[0];
          if (!isFinite(length)) {
            onUpdate(end[1]);
            return;
          }
          
          const t = Math.max(0, Math.min((value - start[0]) / length, 1));
          onUpdate((1 - t) * start[1] + t * end[1]);
        }
      });
    }
  };
};
