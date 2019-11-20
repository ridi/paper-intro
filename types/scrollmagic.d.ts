declare module 'scrollmagic' {
  type SelectorOrElement = string | HTMLElement;
  type ScrollTarget =
    | number
    | SelectorOrElement
    | Scene
    | ((this: Controller, newScrollPos: number, options?: any) => void);
  type ScrollDirection = 'FORWARD' | 'REVERSE' | 'PAUSED';
  type SceneDuration = number | string | ((this: Scene) => number | string);
  type SceneTriggerHook = number | 'onEnter' | 'onCenter' | 'onLeave';
  type SceneState = 'BEFORE' | 'DURING' | 'AFTER';

  interface SceneOptions {
    duration?: SceneDuration;
    offset?: number;
    triggerElement?: SelectorOrElement;
    triggerHook?: SceneTriggerHook;
    reverse?: boolean;
    loglevel?: number;
  }

  interface SceneEventBase {
    type: string;
    target: Scene;
  }

  type SceneEvent<T> = SceneEventBase & T;

  interface PinSettings {
    pushFollowers?: boolean;
    spacerClass?: string;
  }

  export class Scene {
    constructor(options?: SceneOptions);

    controller(): Controller | undefined;
    destroy(reset?: boolean): null;

    addTo(controller: Controller): this;

    refresh(): this;
    remove(): this;
    update(immediately?: boolean): this;

    setClassToggle(element: SelectorOrElement, classes: string): this;
    removeClassToggle(reset?: boolean): this;

    setPin(element: SelectorOrElement, settings?: PinSettings): this;
    removePin(reset?: boolean): this;

    duration(): number;
    duration(value: SceneDuration): this;

    enabled(): boolean;
    enabled(value: boolean): this;

    loglevel(): number;
    loglevel(value: number): this;

    offset(): number;
    offset(value: number): this;

    progress(): number;
    progress(value: number): this;

    reverse(): boolean;
    reverse(value: boolean): this;

    triggerElement(): SelectorOrElement;
    triggerElement(value: SelectorOrElement): this;

    triggerHook(): SceneTriggerHook;
    triggerHook(value: SceneTriggerHook): this;

    scrollOffset(): number;
    state(): SceneState;
    triggerPosition(): number;

    on(names: string, callback: (event: SceneEvent<any>) => void): this;
    off(names: string, callback: (event: SceneEvent<any>) => void): this;
    trigger(names: string, vars: any): this;
  }

  interface ControllerOptions {
    container?: SelectorOrElement;
    vertical?: boolean;
    globalSceneOptions?: SceneOptions;
    loglevel?: number;
    refreshInterval?: number;
  }

  interface ControllerInfo {
    size: number;
    vertical: boolean;
    scrollPos: number;
    scrollDirection: ScrollDirection;
    container: HTMLElement;
    isDocument: boolean;
  }

  export class Controller {
    constructor(options?: ControllerOptions);

    addScene(scene: Scene | Scene[]): this;
    removeScene(scene: Scene | Scene[]): this;

    scrollTo(scrollTarget: ScrollTarget, additionalParameter?: any): this;
    update(immediately?: boolean): this;
    updateScene(scene: Scene, immediately?: boolean): this;

    destroy(resetScenes?: boolean): null;

    enabled(): boolean;
    enabled(value: boolean): this;

    loglevel(): number;
    loglevel(value: number): this;

    scrollPos(): number;
    scrollPos(f: (this: Controller) => number): this;

    info(): ControllerInfo;
    info<K extends keyof ControllerInfo>(about: K): ControllerInfo[K];
  }
}
