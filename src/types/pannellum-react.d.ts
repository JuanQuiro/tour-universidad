declare module 'pannellum-react' {
  import { FC, ReactNode } from 'react'

  interface PannellumProps {
    width: string
    height: string
    image: string
    pitch?: number
    yaw?: number
    hfov?: number
    maxHfov?: number
    minHfov?: number
    maxPitch?: number
    minPitch?: number
    maxYaw?: number
    minYaw?: number
    autoRotate?: number
    compass?: boolean
    preview?: string
    previewTitle?: string
    previewAuthor?: string
    title?: string
    author?: string
    autoLoad?: boolean
    orientationOnByDefault?: boolean
    showZoomCtrl?: boolean
    keyboardZoom?: boolean
    mouseZoom?: boolean
    draggable?: boolean
    disableKeyboardCtrl?: boolean
    showFullscreenCtrl?: boolean
    showControls?: boolean
    hotspotDebug?: boolean
    onLoad?: () => void
    onError?: (error: Error) => void
    onMousedown?: (evt: MouseEvent) => void
    onMouseup?: (evt: MouseEvent) => void
    onTouchstart?: (evt: TouchEvent) => void
    onTouchend?: (evt: TouchEvent) => void
    children?: ReactNode
  }

  interface HotspotProps {
    type: string
    pitch: number
    yaw: number
    text?: string
    URL?: string
    cssClass?: string
    name?: string
    handleClick?: (evt: MouseEvent, name?: string) => void
    handleClickArg?: any
  }

  interface PannellumComponent extends FC<PannellumProps> {
    Hotspot: FC<HotspotProps>
  }

  export const Pannellum: PannellumComponent
}
