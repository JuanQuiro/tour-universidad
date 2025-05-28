import { Link } from 'react-router-dom'
import './styles.css'

const Ayuda = () => {
  return (
    <div className="ayuda-container">
      <header className="ayuda-header">
        <div className="ayuda-header-content">
          <div className="logo-container">
            <div className="logo-circle">
              <span className="logo-text">UNITEC</span>
            </div>
            <div className="logo-info">
              <h1>Explicación de Instalaciones</h1>
              <span>Conoce nuestros espacios</span>
            </div>
          </div>
          <Link to="/" className="back-button">
            <span className="back-icon">←</span>
            Volver al Inicio
          </Link>
        </div>
      </header>

      <main className="ayuda-main">
        <div className="ayuda-content">
          <section className="info-section">
            <h2>Guía de Instalaciones</h2>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">🏛️</div>
                <h3>Edificio Principal</h3>
                <p>
                  Centro administrativo y académico principal de la universidad.
                </p>
                <ul>
                  <li>Oficinas administrativas</li>
                  <li>Aulas principales</li>
                  <li>Sala de profesores</li>
                </ul>
              </div>

              <div className="info-card">
                <div className="info-icon">📚</div>
                <h3>Biblioteca</h3>
                <p>Centro de recursos y estudio para toda la comunidad.</p>
                <ul>
                  <li>Salas de lectura</li>
                  <li>Computadoras de consulta</li>
                  <li>Áreas de estudio grupal</li>
                </ul>
              </div>

              <div className="info-card">
                <div className="info-icon">💻</div>
                <h3>Laboratorios</h3>
                <p>Espacios equipados para prácticas y experimentos.</p>
                <ul>
                  <li>Lab. de computación</li>
                  <li>Lab. de ciencias</li>
                  <li>Lab. de ingeniería</li>
                </ul>
              </div>

              <div className="info-card">
                <div className="info-icon">🏃</div>
                <h3>Áreas Deportivas</h3>
                <p>Instalaciones para actividades físicas y deportivas.</p>
                <ul>
                  <li>Canchas multideporte</li>
                  <li>Gimnasio</li>
                  <li>Pista de atletismo</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="faq-section">
            <h2>Preguntas Frecuentes</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>¿Cómo accedo a los laboratorios?</h3>
                <p>
                  Los laboratorios están disponibles durante el horario de
                  clases y requieren reservación previa con el profesor
                  responsable.
                </p>
              </div>
              <div className="faq-item">
                <h3>¿Dónde encuentro la biblioteca?</h3>
                <p>
                  La biblioteca se encuentra en el segundo piso del edificio
                  principal, con acceso por las escaleras centrales.
                </p>
              </div>
              <div className="faq-item">
                <h3>¿Cuál es el horario de las instalaciones deportivas?</h3>
                <p>
                  Las instalaciones deportivas están abiertas de lunes a viernes
                  de 7:00 AM a 9:00 PM, y sábados de 8:00 AM a 2:00 PM.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Ayuda
