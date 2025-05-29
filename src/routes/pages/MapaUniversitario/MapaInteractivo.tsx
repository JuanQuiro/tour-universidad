import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MapaInteractivo.css';

// Imagen de ejemplo - reemplaza con tu imagen real
const mapaImage = '/mapaUniversidad.jpeg';

interface Hotspot {
  id: string;
  title: string;
  description: string;
  x: number; // Porcentaje desde la izquierda (0-100)
  y: number; // Porcentaje desde arriba (0-100)
  tourId: string;
}

const MapaInteractivo = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Definir las áreas interactivas (hotspots) en el mapa
  const hotspots: Hotspot[] = [
    {
      id: 'edificio-principal',
      title: 'Edificio Principal',
      description: 'Centro administrativo y académico',
      x: 30,
      y: 40,
      tourId: 'edificio-principal'
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca',
      description: 'Centro de recursos y estudio',
      x: 60,
      y: 30,
      tourId: 'biblioteca'
    },
    {
      id: 'laboratorios',
      title: 'Laboratorios',
      description: 'Área de laboratorios especializados',
      x: 70,
      y: 60,
      tourId: 'laboratorios'
    },
    {
      id: 'deportes',
      title: 'Área Deportiva',
      description: 'Instalaciones deportivas',
      x: 40,
      y: 70,
      tourId: 'deportes'
    }
  ];

  const handleHotspotClick = (e: React.MouseEvent, hotspot: Hotspot) => {
    e.stopPropagation();
    setActiveHotspot(hotspot.id === activeHotspot ? null : hotspot.id);
  };

  const handleMapClick = () => {
    setActiveHotspot(null);
  };

  const handleTourClick = (e: React.MouseEvent, tourId: string) => {
    e.stopPropagation();
    window.location.href = `/tour-virtual#${tourId}`;
  };

  return (
    <div className="mapa-container">
      <header className="mapa-header">
        <div className="mapa-header-content">
          <div className="logo-container">
            <div className="logo-circle">
            </div>
            <div className="logo-info">
              <h1>Mapa Universitario</h1>
              <span>Haz clic en un lugar para más información</span>
            </div>
          </div>
          <Link to="/" className="back-button">
            <span className="back-icon">←</span>
            Volver al Inicio
          </Link>
        </div>
      </header>

      <main className="mapa-main">
        <div className="mapa-content">
          <div 
            className="mapa-interactivo" 
            ref={containerRef}
            onClick={handleMapClick}
          >
            <img 
              src={mapaImage} 
              alt="Mapa de la Universidad" 
              className="mapa-imagen"
            />
            
            {/* Renderizar los hotspots */}
            {hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className={`hotspot ${activeHotspot === hotspot.id ? 'active' : ''}`}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={(e) => handleHotspotClick(e, hotspot)}
              >
                <div className="hotspot-marker"></div>
                {activeHotspot === hotspot.id && (
                  <div className="hotspot-info">
                    <h3>{hotspot.title}</h3>
                    <p>{hotspot.description}</p>
                    <button 
                      className="tour-button"
                      onClick={(e) => handleTourClick(e, hotspot.tourId)}
                    >
                      Ver Tour Virtual
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mapa-leyenda">
            <h3>Leyenda</h3>
            <ul>
              {hotspots.map((hotspot) => (
                <li 
                  key={hotspot.id}
                  className={activeHotspot === hotspot.id ? 'active' : ''}
                  onClick={() => setActiveHotspot(hotspot.id)}
                >
                  <span className="leyenda-marker"></span>
                  {hotspot.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className="mapa-footer">
        <p>© {new Date().getFullYear()} UNITEC - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default MapaInteractivo;
