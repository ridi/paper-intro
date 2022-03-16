import { Animation, DiscreteKeyframe, Keyframe, Timeline } from './types';

const isDiscreteKeyframe = (keyframe: Keyframe<string, string>): keyframe is DiscreteKeyframe<string> =>
  typeof keyframe.value === 'string';

const binarySearchKeyframe = <T>(haystack: [number, T][], needle: number):
  [[number, T] | undefined, [number, T] | undefined] =>
{
  let start = 0;
  let end = haystack.length - 1;
  while (start <= end) {
    const middle = start + Math.floor((end - start) / 2);
    if (haystack[middle][0] < needle) {
      start = middle + 1;
      continue;
    }
    
    if (haystack[middle][0] === needle) {
      return [haystack[middle], haystack[middle + 1]];
    }
    
    end = middle - 1;
  }
  
  if (end < 0) {
    return [haystack[0], haystack[1]];
  }
  
  return [haystack[end], haystack[start]];
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
        const position = (currentScroll + scrollStamp) / totalScroll;
        
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
      console.log(value);
      subscribedMap.forEach((onUpdate, key) => {
        if (key in discreteTimeline) {
          const [start] = binarySearchKeyframe(discreteTimeline[key as DiscreteKeyframeNames], value);
          if (!start) {
            // Has no keyframes
            return;
          }
          
          onUpdate(start[1]);
        } else if (key in continuousTimeline) {
          const [start, end] = binarySearchKeyframe(continuousTimeline[key as ContinuousKeyframeNames], value);
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
          
          const t = (value - start[0]) / length;
          onUpdate(t * start[1] + (1 - t) * end[1]);
        }
      });
    }
  };
};
