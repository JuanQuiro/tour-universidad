import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Busqueda = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de búsqueda
    console.log('Buscando:', searchTerm)
  }

  return (
    <div className="busqueda-container">
      <header className="busqueda-header">
        <div className="busqueda-header-content">
          <div className="logo-container">
            <div className="logo-circle">
              <span className="logo-text">UNITEC</span>
            </div>
            <div className="logo-info">
              <h1>Búsqueda por Secciones</h1>
              <span>Encuentra lo que necesitas</span>
            </div>
          </div>
          <Link to="/" className="back-button">
            <span className="back-icon">←</span>
            Volver al Inicio
          </Link>
        </div>
      </header>

      <main className="busqueda-main">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar instalaciones, aulas, oficinas..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                <span className="search-icon">🔍</span>
                Buscar
              </button>
            </div>
          </form>

          <div className="search-categories">
            <h3>Categorías Populares</h3>
            <div className="category-grid">
              <button className="category-button">
                <span className="category-icon">📚</span>
                Aulas
              </button>
              <button className="category-button">
                <span className="category-icon">💻</span>
                Laboratorios
              </button>
              <button className="category-button">
                <span className="category-icon">🏢</span>
                Oficinas
              </button>
              <button className="category-button">
                <span className="category-icon">🎨</span>
                Talleres
              </button>
              <button className="category-button">
                <span className="category-icon">🏃</span>
                Deportes
              </button>
              <button className="category-button">
                <span className="category-icon">🍽️</span>
                Servicios
              </button>
            </div>
          </div>

          <div className="search-results">
            <h3>Resultados de Búsqueda</h3>
            <div className="results-placeholder">
              <p>Ingresa un término para comenzar la búsqueda</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Busqueda
