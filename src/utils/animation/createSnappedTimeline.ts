import { createTimeline } from './createTimeline';
import { Animation, Keyframe, Timeline } from './types';

export const createSnappedTimeline = <
  DiscreteKeyframeNames extends string,
  ContinuousKeyframeNames extends string,
>(
  animations: Animation<Keyframe<DiscreteKeyframeNames, ContinuousKeyframeNames | 'Snap'>>[],
  speed = 0.1,
): Timeline<DiscreteKeyframeNames, ContinuousKeyframeNames | 'Snap'> => {
  const timeline = createTimeline(animations);
  const snapPositions = timeline.getScrollStamps('Snap');
  let currentPosition = 0;
  let targetPosition = 0;
  let animationFrameId: number | null = null;
  const onAnimationFrame = () => {
    const nextPosition = currentPosition + (targetPosition - currentPosition) * speed;
    timeline.update(nextPosition);
    currentPosition = nextPosition;
    animationFrameId = requestAnimationFrame(onAnimationFrame);
  };
  
  onAnimationFrame();
  
  return {
    ...timeline,
    update: (position) => {
      const newTarget = snapPositions.find((currentSnapPosition, index) => {
        if (index >= snapPositions.length - 1) {
          return currentSnapPosition <= position;
        }
        
        if (index === 0 && position < currentSnapPosition) {
          return true;
        }
        
        const nextSnapPosition = snapPositions[index + 1];
        return currentSnapPosition <= position && position < nextSnapPosition;
      });
      
      if (typeof newTarget === 'number') {
        targetPosition = newTarget;
      }
    },
    
    destroy: () => {
      if (typeof animationFrameId === 'number') {
        cancelAnimationFrame(animationFrameId);
      }
    }
  }
};
