declare module 'react-pannellum' {
  import { FC } from 'react'

  interface PannellumProps {
    width: string
    height: string
    image: string
    pitch?: number
    yaw?: number
    hfov?: number
    autoLoad?: boolean
    onLoad?: () => void
    onError?: (error: Error) => void
    hotspots?: Array<{
      pitch: number
      yaw: number
      type: string
      text: string
      sceneId?: string
    }>
    onScenechange?: (sceneId: string) => void
    onClick?: (event: {
      type: string
      sceneId?: string
      [key: string]: any
    }) => void
    compass?: boolean
    northOffset?: number
    showZoomCtrl?: boolean
    mouseZoom?: boolean
    draggable?: boolean
    disableKeyboardCtrl?: boolean
    keyboardZoom?: boolean
    preview?: string
    previewTitle?: string
    showFullscreenCtrl?: boolean
    hotSpotDebug?: boolean
  }

  export const Pannellum: FC<PannellumProps>
}
