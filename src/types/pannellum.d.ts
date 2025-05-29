declare module 'pannellum' {
  export interface PannellumSceneOptions {
    title?: string;
    type?: string;
    panorama: string;
    hotSpots?: HotSpot[];
    yaw?: number;
    pitch?: number;
    hfov?: number;
  }

  export interface PannellumOptions {
    default?: {
      firstScene?: string;
      sceneFadeDuration?: number;
      autoLoad?: boolean;
      compass?: boolean;
      showControls?: boolean;
      showFullscreenCtrl?: boolean;
      showZoomCtrl?: boolean;
    };
    scenes?: Record<string, PannellumSceneOptions>;
    type?: string;
    title?: string;
    author?: string;
    autoLoad?: boolean;
    autoRotate?: number;
    autoRotateInactivityDelay?: number;
    autoRotateStopDelay?: number;
    preview?: string;
    showZoomCtrl?: boolean;
    showFullscreenCtrl?: boolean;
    showControls?: boolean;
    yaw?: number;
    pitch?: number;
    hfov?: number;
    minYaw?: number;
    maxYaw?: number;
    minPitch?: number;
    maxPitch?: number;
    minHfov?: number;
    maxHfov?: number;
    compass?: boolean;
    northOffset?: number;
    hotSpots?: HotSpot[];
    hotSpotDebug?: boolean;
    sceneFadeDuration?: number;
    dynamic?: boolean;
    dynamicUpdate?: boolean;
  }

  export interface HotSpot {
    pitch: number;
    yaw: number;
    type?: string;
    text?: string;
    URL?: string;
    cssClass?: string;
    createTooltipFunc?: (hotSpotDiv: HTMLDivElement, args: any) => void;
    clickHandlerFunc?: (e: MouseEvent, args: any) => void;
    sceneId?: string;
  }

  export interface Scene {
    type?: string;
    title?: string;
    author?: string;
    imageSource: string;
    hotSpots?: HotSpot[];
  }

  export interface Viewer {
    destroy(): void;
    getConfig(): PannellumOptions;
    getScene(): string;
    loadScene(sceneId: string, pitch?: number, yaw?: number, hfov?: number): void;
    lookAt(pitch: number, yaw: number, hfov?: number, animated?: boolean): void;
    on(event: string, handler: (...args: any[]) => void): void;
    removeHotSpot(hotSpotId: string): boolean;
    resize(): void;
    stopAutoRotate(): void;
    toggleFullscreen(): void;
  }

  export function viewer(container: string | HTMLElement, options: PannellumOptions): Viewer;
}
