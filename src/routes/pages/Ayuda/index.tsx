import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './styles.css'

interface Installation {
  id: string
  title: string
  icon: string
  description: string
  details: string[]
  features: string[]
}

interface Service {
  id: string
  title: string
  icon: string
  description: string
  details: string[]
}

interface FAQ {
  question: string
  answer: string
}

interface Sections {
  instalaciones: {
    title: string
    content: Installation[]
  }
  servicios: {
    title: string
    content: Service[]
  }
  faq: {
    title: string
    content: FAQ[]
  }
}

const Ayuda = () => {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Extraer el ID de la sección del hash de la URL
    const hash = location.hash.replace('#', '')
    if (hash) {
      setActiveSection(hash)
      const element = document.getElementById(hash)
      if (element) {
        const yOffset = -80
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    } else {
      setActiveSection('edificio-principal')
    }
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-section')
      let currentSection = ''

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop <= 100) {
          currentSection = section.id
        }
      })

      if (currentSection !== '' && currentSection !== activeSection) {
        setActiveSection(currentSection)
        window.history.replaceState(null, '', `#${currentSection}`)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -80
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      window.history.pushState(null, '', `#${sectionId}`)
      setActiveSection(sectionId)
      if (isMobile) {
        setIsSidebarOpen(false)
      }
    }
  }

  const sections: Sections = {
    instalaciones: {
      title: 'Instalaciones',
      content: [
        {
          id: 'edificio-principal',
          title: 'Edificio Principal',
          icon: '🏛️',
          description:
            'Centro administrativo y académico principal de la universidad.',
          details: [
            'Ubicado en el centro del campus',
            'Acceso principal por la entrada norte',
            'Cuatro pisos de altura',
            'Elevadores y escaleras accesibles'
          ],
          features: [
            'Oficinas administrativas en el primer piso',
            'Aulas principales del segundo al cuarto piso',
            'Sala de profesores en el tercer piso',
            'Auditorio principal en planta baja'
          ]
        },
        {
          id: 'biblioteca',
          title: 'Biblioteca',
          icon: '📚',
          description:
            'Centro de recursos y estudio para toda la comunidad universitaria.',
          details: [
            'Ubicada en el segundo piso del edificio este',
            'Horario: Lunes a Viernes 7:00 - 21:00',
            'Sábados: 8:00 - 14:00',
            'Capacidad para 500 estudiantes'
          ],
          features: [
            'Salas de lectura individual y grupal',
            'Computadoras de consulta',
            'Préstamo de libros y recursos digitales',
            'Áreas de estudio silencioso'
          ]
        },
        {
          id: 'laboratorios',
          title: 'Laboratorios',
          icon: '💻',
          description: 'Espacios equipados para prácticas y experimentos.',
          details: [
            'Distribuidos en varios edificios del campus',
            'Acceso con credencial universitaria',
            'Reserva previa necesaria',
            'Capacidad variable según el laboratorio'
          ],
          features: [
            'Laboratorios de computación con software especializado',
            'Laboratorios de ciencias con equipo moderno',
            'Laboratorios de ingeniería con herramientas profesionales',
            'Áreas de trabajo colaborativo'
          ]
        },
        {
          id: 'areas-deportivas',
          title: 'Áreas Deportivas',
          icon: '🏃',
          description: 'Instalaciones para actividades físicas y deportivas.',
          details: [
            'Ubicadas en la zona sur del campus',
            'Horario: Lunes a Viernes 6:00 - 22:00',
            'Sábados: 8:00 - 18:00',
            'Acceso con credencial deportiva'
          ],
          features: [
            'Canchas multideporte techadas',
            'Gimnasio equipado',
            'Pista de atletismo profesional',
            'Vestidores y duchas'
          ]
        }
      ]
    },
    servicios: {
      title: 'Servicios',
      content: [
        {
          id: 'prestamos',
          title: 'Préstamo de Equipos',
          icon: '🔧',
          description: 'Servicio de préstamo de equipos y materiales.',
          details: [
            'Disponible en horario escolar',
            'Requiere credencial vigente',
            'Reserva anticipada recomendada',
            'Sujeto a disponibilidad'
          ]
        },
        {
          id: 'cafeteria',
          title: 'Cafetería',
          icon: '🍽️',
          description: 'Servicio de alimentos y bebidas.',
          details: [
            'Horario: 7:00 - 20:00',
            'Menú variado y nutritivo',
            'Opciones vegetarianas disponibles',
            'Área de microondas para comida propia'
          ]
        }
      ]
    },
    faq: {
      title: 'Preguntas Frecuentes',
      content: [
        {
          question: '¿Cómo accedo a los laboratorios?',
          answer:
            'Los laboratorios están disponibles durante el horario de clases y requieren reservación previa con el profesor responsable. Debes presentar tu credencial vigente y seguir los protocolos de seguridad establecidos.'
        },
        {
          question: '¿Dónde encuentro la biblioteca?',
          answer:
            'La biblioteca se encuentra en el segundo piso del edificio este, con acceso por las escaleras centrales o el elevador. Cuenta con señalización clara desde la entrada principal.'
        },
        {
          question: '¿Cuál es el horario de las instalaciones deportivas?',
          answer:
            'Las instalaciones deportivas están abiertas de lunes a viernes de 6:00 AM a 22:00 PM, y sábados de 8:00 AM a 18:00 PM. Se requiere credencial deportiva actualizada para el acceso.'
        },
        {
          question: '¿Cómo reservo un espacio de estudio?',
          answer:
            'Puedes reservar espacios de estudio a través del portal web de la biblioteca o directamente en el mostrador de servicios. Las reservas pueden hacerse con hasta una semana de anticipación.'
        }
      ]
    }
  }

  return (
    <div className="docs-container">
      {isMobile && (
        <button
          className="menu-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>
      )}

      <nav className={`docs-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="docs-sidebar-header">
          <div className="logo-circle">
            <span className="logo-text">UNITEC</span>
          </div>
          <Link to="/" className="back-link">
            ← Inicio
          </Link>
        </div>
        <div className="sidebar-content">
          {Object.entries(sections).map(([key, section]) => (
            <div key={key} className="sidebar-section">
              <h3 className="sidebar-title">{section.title}</h3>
              {key === 'instalaciones' && (
                <ul className="sidebar-list">
                  {(section.content as Installation[]).map((item) => (
                    <li key={item.id}>
                      <button
                        className={`sidebar-link ${
                          activeSection === item.id ? 'active' : ''
                        }`}
                        onClick={() => handleNavigation(item.id)}
                      >
                        {item.icon} {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </nav>

      <main className="docs-content">
        <div className="docs-header">
          <h1>Documentación de Instalaciones</h1>
          <p className="docs-subtitle">
            Guía completa de las instalaciones y servicios universitarios
          </p>
        </div>

        <div className="docs-body">
          {sections.instalaciones.content.map((item) => (
            <section key={item.id} id={item.id} className="content-section">
              <h2>
                {item.icon} {item.title}
              </h2>
              <p className="section-description">{item.description}</p>

              <div className="details-grid">
                <div className="details-card">
                  <h3>Detalles</h3>
                  <ul>
                    {item.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="details-card">
                  <h3>Características</h3>
                  <ul>
                    {item.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}

          <section id="faq" className="content-section">
            <h2>❓ Preguntas Frecuentes</h2>
            <div className="faq-grid">
              {sections.faq.content.map((item, index) => (
                <div key={index} className="faq-card">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Ayuda
