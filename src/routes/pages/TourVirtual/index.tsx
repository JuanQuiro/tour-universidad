import { Link } from 'react-router-dom'
import './styles.css'

const TourVirtual = () => {
  return (
    <div className="tour-virtual-container">
      <header className="tour-header">
        <div className="tour-header-content">
          <div className="logo-container">
            <div className="logo-circle">
              <span className="logo-text">UNITEC</span>
            </div>
            <div className="logo-info">
              <h1>Tour Virtual</h1>
              <span>Explora nuestras instalaciones</span>
            </div>
          </div>
          <div className="navigation-controls">
            <div className="scene-info">
              Ubicación Actual: Entrada Principal
            </div>
            <Link to="/" className="back-button">
              <span className="back-icon">←</span>
              Volver al Inicio
            </Link>
          </div>
        </div>
      </header>

      <main className="panorama-main">
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando Tour Virtual...</p>
          </div>
        </div>

        <div className="instructions-panel">
          <div className="instructions-content">
            <h3>Instrucciones de Navegación</h3>
            <div className="instructions-grid">
              <div className="instruction-item">
                <span className="instruction-icon">🖱️</span>
                <span>Click y arrastra para mirar alrededor</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">⚡</span>
                <span>Doble click para acercar</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">🎯</span>
                <span>Click en puntos para navegar</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">⌨️</span>
                <span>Usa WASD para moverte</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TourVirtual
