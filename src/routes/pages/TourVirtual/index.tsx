import { useEffect, useRef, useState } from 'react';
import 'pannellum';
import 'pannellum/build/pannellum.css';
import './styles.css';

// Extendemos la interfaz Window para incluir pannellum
declare global {
  interface Window {
    pannellum: {
      viewer: (container: string | HTMLElement, config: PannellumOptions) => ViewerInstance;
    };
  }
}

// Definiciones de tipo para Pannellum (basadas en tu src/types/pannellum.d.ts)
interface PannellumHotSpot {
  pitch: number;
  yaw: number;
  type?: string;
  text?: string;
  URL?: string;
  cssClass?: string;
  sceneId?: string;
  // Añade aquí otras propiedades de hotspot que uses
}

interface PannellumSceneConfig {
  title?: string;
  type?: string; // ej. 'equirectangular'
  panorama: string;
  hotSpots?: PannellumHotSpot[];
  // Añade aquí otras propiedades de configuración de escena que uses
}

interface PannellumOptions {
  default?: {
    firstScene?: string;
    sceneFadeDuration?: number;
    autoLoad?: boolean;
    compass?: boolean;
    showControls?: boolean;
    showFullscreenCtrl?: boolean;
    showZoomCtrl?: boolean;
    // Añade aquí otras opciones default que uses
  };
  scenes?: Record<string, PannellumSceneConfig>;
  // Añade aquí otras opciones generales que uses
}

interface ViewerInstance {
  destroy: () => void;
  on: (event: string, handler: (...args: any[]) => void) => void;
  off: (event: string, handler?: (...args: any[]) => void) => void;
  resize: () => void;
  loadScene: (sceneId: string, pitch?: number, yaw?: number, hfov?: number) => void;
  getScene: () => string;
  // Añade aquí otros métodos de la instancia del viewer que uses
}

// Interfaz para la configuración de nuestras escenas, extendiendo la idea básica
interface SceneConfig {
  id: string;
  title: string; // title es parte de nuestra configuración de escena, no necesariamente de PannellumSceneConfig
  imageSource: string; // imageSource es nuestro campo, se mapea a panorama en PannellumSceneConfig
  hotSpots?: PannellumHotSpot[];
}

const scenes: SceneConfig[] = [
  {
    id: 'entrada',
    title: 'Entrada Principal',
    imageSource: 'https://pannellum.org/images/alma.jpg',
    hotSpots: [
      {
        pitch: -2.1,
        yaw: 132.9,
        type: 'scene',
        text: 'Edificio Principal',
        sceneId: 'edificio-principal',
      },
    ],
  },
  {
    id: 'edificio-principal',
    title: 'Edificio Principal',
    imageSource: 'https://pannellum.org/images/cerro-toco-0.jpg',
    hotSpots: [
      {
        pitch: 0.3,
        yaw: 154.4,
        type: 'scene',
        text: 'Biblioteca',
        sceneId: 'biblioteca',
      },
      {
        pitch: -1.1,
        yaw: -127.7,
        type: 'scene',
        text: 'Volver a la Entrada',
        sceneId: 'entrada',
      },
    ],
  },
  {
    id: 'biblioteca',
    title: 'Biblioteca',
    imageSource: 'https://pannellum.org/images/trail.jpg',
    hotSpots: [
      {
        pitch: -0.6,
        yaw: 37.1,
        type: 'scene',
        text: 'Volver al Edificio Principal',
        sceneId: 'edificio-principal',
      },
    ],
  },
];

export default function TourVirtual() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState(scenes[0].id);
  const viewerRef = useRef<ViewerInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pannellumInitializedRef = useRef(false); // Usamos un ref para rastrear la inicialización

  useEffect(() => {
    // Verificar si Pannellum está disponible
    if (!window.pannellum || !window.pannellum.viewer) {
      console.error('Pannellum no está disponible. Asegúrate de que el script de Pannellum esté correctamente cargado.');
      setIsLoading(false);
      return;
    }

    // Verificar si el contenedor está disponible
    if (!containerRef.current) {
      console.error('El contenedor no está disponible');
      setIsLoading(false);
      return;
    }

    // Configuración de Pannellum
    const pannellumOptions: PannellumOptions = {
      default: {
        firstScene: scenes[0].id,
        sceneFadeDuration: 1000,
        autoLoad: true,
        compass: true,
        showControls: true,
        showFullscreenCtrl: true,
        showZoomCtrl: true,
      },
      scenes: scenes.reduce((acc, scene) => {
        acc[scene.id] = {
          title: scene.title,
          type: 'equirectangular',
          panorama: scene.imageSource,
          hotSpots: scene.hotSpots,
        };
        return acc;
      }, {} as Record<string, PannellumSceneConfig>),
    };

    try {
      // Inicializar Pannellum
      viewerRef.current = window.pannellum.viewer(containerRef.current, pannellumOptions);
      
      // Configurar manejadores de eventos
      viewerRef.current.on('load', () => {
        console.log('Pannellum cargado correctamente');
        setIsLoading(false);
      });

      viewerRef.current.on('scenechange', (sceneId: string) => {
        setCurrentScene(sceneId);
      });

      // Manejar redimensionamiento
      const handleResize = () => {
        if (viewerRef.current && typeof viewerRef.current.resize === 'function') {
          viewerRef.current.resize();
        }
      };

      window.addEventListener('resize', handleResize);

      // Limpieza al desmontar
      return () => {
        if (viewerRef.current) {
          viewerRef.current.destroy();
          viewerRef.current = null;
        }
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error al inicializar Pannellum:', error);
      setIsLoading(false);
    }
  }, []);

  // Efecto para manejar el redimensionamiento de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (viewerRef.current && typeof viewerRef.current.resize === 'function') {
        viewerRef.current.resize();
      }
    };

    // Asegurarse de que el contenedor tenga dimensiones válidas
    const ensureContainerSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width === 0 || height === 0) {
          // Forzar un nuevo diseño si las dimensiones son cero
          containerRef.current.style.width = '100%';
          containerRef.current.style.height = '100%';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      ensureContainerSize();
    }

    // Forzar un redibujado después de que el componente se monte
    const timer = setTimeout(() => {
      handleResize();
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="tour-virtual-container">
      <header className="tour-header">
        <div className="scene-title">
          UNITEC Virtual
        </div>
      </header>
      
      <div className="bottom-controls">
        <a href="/" className="control-button back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" fill="white"/>
          </svg>
          Volver al inicio
        </a>
        <button 
          className="control-button main-entrance-button" 
          onClick={() => {
            if (viewerRef.current) {
              viewerRef.current.on('load', () => {
                setIsLoading(false);
              });
              viewerRef.current.loadScene('entrada');
              setCurrentScene('entrada');
            }
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="white"/>
          </svg>
          Entrada Principal
        </button>
      </div>

      <div className="tour-content">
        <div 
          ref={containerRef} 
          id="panorama" 
          className="panorama-container"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            overflow: 'hidden'
          }}
        />
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p>Cargando escena...</p>
          </div>
        )}
      </div>

      <div className="instructions-panel">
        <h2>Instrucciones</h2>
        <ul>
          <li>Arrastra para mirar alrededor</li>
          <li>Usa la rueda del ratón para hacer zoom</li>
          <li>Haz clic en los puntos para navegar</li>
          <li>Usa la brújula para orientarte</li>
        </ul>
      </div>
    </div>
  );
}
