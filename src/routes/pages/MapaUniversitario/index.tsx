import { Link } from 'react-router-dom'
import './styles.css'

const MapaUniversitario = () => {
  return (
    <div className="mapa-container">
      <header className="mapa-header">
        <div className="mapa-header-content">
          <div className="logo-container">
            <div className="logo-circle">
              <span className="logo-text">UNITEC</span>
            </div>
            <div className="logo-info">
              <h1>Mapa Universitario</h1>
              <span>Encuentra tu camino</span>
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
          <div className="mapa-placeholder">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Cargando Mapa Interactivo...</p>
            </div>
          </div>

          <div className="mapa-controls">
            <button className="control-button">
              <span className="control-icon">🔍</span>
              Acercar
            </button>
            <button className="control-button">
              <span className="control-icon">🔎</span>
              Alejar
            </button>
            <button className="control-button">
              <span className="control-icon">🎯</span>
              Centrar
            </button>
            <button className="control-button">
              <span className="control-icon">🔄</span>
              Rotar
            </button>
          </div>

          <div className="location-info">
            <h3>Ubicaciones Destacadas</h3>
            <ul className="location-list">
              <li className="location-item">
                <span className="location-icon">🏛️</span>
                <span className="location-name">Edificio Principal</span>
              </li>
              <li className="location-item">
                <span className="location-icon">📚</span>
                <span className="location-name">Biblioteca</span>
              </li>
              <li className="location-item">
                <span className="location-icon">🏃</span>
                <span className="location-name">Área Deportiva</span>
              </li>
              <li className="location-item">
                <span className="location-icon">🍽️</span>
                <span className="location-name">Cafetería</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MapaUniversitario
