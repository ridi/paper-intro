export type DiscreteKeyframe<DiscreteKeyframeNames extends string> =
  { name: DiscreteKeyframeNames, value: string };

export type ContinuousKeyframe<ContinuousKeyframeNames extends string> =
  { name: ContinuousKeyframeNames, value: number };

export type Keyframe<
  DiscreteKeyframeNames extends string,
  ContinuousKeyframeNames extends string
> =
  | DiscreteKeyframe<DiscreteKeyframeNames>
  | ContinuousKeyframe<ContinuousKeyframeNames>;

export type Animation<K extends Keyframe<string, string>> = {
  duration: number,
  keyframes: [number, K][]
};

export type Timeline<
  DiscreteKeyframeNames extends string,
  ContinuousKeyframeNames extends string
> = {
  subscribe: <K extends DiscreteKeyframeNames | ContinuousKeyframeNames>(
    key: K,
    onUpdate: (value: K extends DiscreteKeyframeNames ? string : number) => void
  ) => void;
  unsubscribe: (key: DiscreteKeyframeNames | ContinuousKeyframeNames) => void;
  update: (duration: number) => void
};
