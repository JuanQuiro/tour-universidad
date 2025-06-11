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

// Mapeo de nombres de archivo a títulos más descriptivos
const sceneTitles: { [key: string]: string } = {
  'el-graduando-salida-principal.jpg': 'Entrada Principal - El Graduando',
  'cafeteria-baños-2.jpg': 'Cafetería - Baños',
  'cafeteria-baños.jpg': 'Cafetería - Baños (Vista 2)',
  'cafeteria-comedor-2.jpg': 'Cafetería - Comedor (Vista 2)',
  'cafeteria-comedor.jpg': 'Cafetería - Comedor',
  'cafeteria-entrada-desde-un-poco-lejos.jpg': 'Entrada a la Cafetería',
  'cafeteria-muebles.jpg': 'Cafetería - Área de Muebles',
  'cafetin-centro.jpg': 'Cafetín del Centro',
  'fuera-de-caferia.jpg': 'Exterior de la Cafetería',
  'fuera-de-cafeteria-2.jpg': 'Exterior de la Cafetería (Vista 2)',
  'fuera-de-cafeteria.jpg': 'Exterior de la Cafetería (Vista 3)',
  'fuera-de-cafeteria3.jpg': 'Exterior de la Cafetería (Vista 4)',
  'fuera-de-cafeteria4.jpg': 'Exterior de la Cafetería (Vista 5)',
  'fuera-de-cafetin.jpg': 'Exterior del Cafetín'
};

// Obtener todas las imágenes de la carpeta scenes
const sceneFiles = [
  'el-graduando-salida-principal.jpg',
  'cafeteria-entrada-desde-un-poco-lejos.jpg',
  'cafeteria-comedor.jpg',
  'cafeteria-comedor-2.jpg',
  'cafeteria-muebles.jpg',
  'cafeteria-baños.jpg',
  'cafeteria-baños-2.jpg',
  'cafetin-centro.jpg',
  'fuera-de-cafetin.jpg',
  'fuera-de-caferia.jpg',
  'fuera-de-cafeteria.jpg',
  'fuera-de-cafeteria-2.jpg',
  'fuera-de-cafeteria3.jpg',
  'fuera-de-cafeteria4.jpg'
];

// Función para generar hotspots entre escenas
const generateHotspots = (
  currentIndex: number,
  total: number,
  sceneIds: string[]
): PannellumHotSpot[] => {
  const hotspots: PannellumHotSpot[] = [];
  
  // Hotspot para la escena anterior
  if (currentIndex > 0) {
    hotspots.push({
      pitch: 0,
      yaw: -90,
      type: 'scene',
      text: 'Anterior',
      sceneId: sceneIds[currentIndex - 1],
      cssClass: 'custom-hotspot',
    });
  }
  
  // Hotspot para la escena siguiente
  if (currentIndex < total - 1) {
    hotspots.push({
      pitch: 0,
      yaw: 90,
      type: 'scene',
      text: 'Siguiente',
      sceneId: sceneIds[currentIndex + 1],
      cssClass: 'custom-hotspot',
    });
  }
  
  return hotspots;
};

// Crear los IDs de las escenas primero
const sceneIds = sceneFiles.map((filename) => 
  filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-]/g, '-')
);

// Crear el arreglo de escenas
const scenes: SceneConfig[] = sceneFiles.map((filename, index) => {
  const sceneId = sceneIds[index];
  
  return {
    id: sceneId,
    title: sceneTitles[filename] || filename.replace(/-/g, ' ').replace(/\.[^/.]+$/, ''),
    imageSource: `/scenes/${filename}`,
    hotSpots: generateHotspots(index, sceneFiles.length, sceneIds)
  };
});

// Estilos CSS para los hotspots
const styles = `
  .custom-hotspot {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .custom-hotspot:hover {
    background-color: rgba(0, 100, 200, 0.8);
  }
  
  .pnlm-title {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
    max-width: 80%;
  }
`;

// Añadir estilos al documento
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default function TourVirtual() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState(scenes[0].id);
  const [currentTitle, setCurrentTitle] = useState(scenes[0].title);
  const viewerRef = useRef<ViewerInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pannellumInitializedRef = useRef(false);

  // Función para manejar el cambio de escena
  const handleSceneChange = (sceneId: string) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (scene) {
      setCurrentScene(sceneId);
      setCurrentTitle(scene.title);
    }
  };

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

    // Asegurarse de que el contenedor esté vacío
    containerRef.current.innerHTML = '';
    
    // Crear un nuevo div para el visor
    const viewerDiv = document.createElement('div');
    viewerDiv.id = 'pannellum-container';
    viewerDiv.style.width = '100%';
    viewerDiv.style.height = '100%';
    containerRef.current.appendChild(viewerDiv);

    // Si ya está inicializado, destruir la instancia anterior
    if (pannellumInitializedRef.current && viewerRef.current) {
      try {
        viewerRef.current.destroy();
      } catch (e) {
        console.warn('Error al destruir la instancia anterior de Pannellum:', e);
      }
    }

    // Configuración de Pannellum
    const pannellumOptions: PannellumOptions = {
      default: {
        firstScene: currentScene,
        sceneFadeDuration: 1000,
        autoLoad: true,
        compass: true,
        showControls: true,
        showFullscreenCtrl: true,
        showZoomCtrl: true,
        // Limitar el movimiento vertical
        minPitch: -30,  // Limitar el movimiento hacia abajo
        maxPitch: 30,   // Limitar el movimiento hacia arriba
        // Configuración para fotos 360° sin cubo completo
        autoRotate: -2, // Rotación automática lenta (opcional)
        autoRotateInactivityDelay: 3000, // Tiempo antes de que comience la rotación automática
        autoRotateStopDelay: 3000, // Tiempo que permanece detenida la rotación al interactuar
        // Mejorar la experiencia de visualización
        hfov: 100, // Campo de visión horizontal inicial
        showZoomCtrl: false, // Ocultar controles de zoom ya que no son necesarios
        mouseZoom: false, // Desactivar zoom con rueda del mouse
        draggable: true, // Permitir arrastrar para girar
        disableKeyboardCtrl: false, // Habilitar controles de teclado
        keyboardZoom: false, // Desactivar zoom con teclado
      },
      scenes: {}
    };

    // Convertir nuestras escenas al formato que espera Pannellum
    scenes.forEach(scene => {
      pannellumOptions.scenes![scene.id] = {
        title: scene.title,
        type: 'equirectangular',
        panorama: scene.imageSource,
        hotSpots: scene.hotSpots
      };
    });

    try {
      // Usar el ID del div que acabamos de crear
      viewerRef.current = window.pannellum.viewer(viewerDiv, pannellumOptions);
      
      // Configurar el manejador de cambio de escena
      viewerRef.current.on('scenechange', (newSceneId: string) => {
        handleSceneChange(newSceneId);
      });
      
      // Configurar el manejador de carga
      viewerRef.current.on('load', () => {
        setIsLoading(false);
      });
      
      pannellumInitializedRef.current = true;
    } catch (error) {
      console.error('Error al inicializar Pannellum:', error);
      setIsLoading(false);
    }

    // Cleanup function
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e) {
          console.error('Error al destruir Pannellum:', e);
        }
        viewerRef.current = null;
      }
      
      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [currentScene]);

  useEffect(() => {
    const handleResize = () => {
      if (viewerRef.current && typeof viewerRef.current.resize === 'function') {
        viewerRef.current.resize();
      }
    };

    // Configurar el observador de redimensionamiento para el contenedor
    const resizeObserver = new ResizeObserver(handleResize);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Forzar un redibujado después de que el componente se monte
    const timer = setTimeout(() => {
      handleResize();
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
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
