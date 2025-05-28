import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

interface Particle {
  id: number
  left: number
  delay: number
  duration: number
}

// Extendemos la interfaz Window para incluir webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

const Home = () => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: Math.random() * 10 + 10
      })
    }
    setParticles(newParticles)
  }, [])

  const playSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      const audioContext = new AudioContextClass()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        audioContext.currentTime + 0.1
      )

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      )

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      console.log('Audio no disponible')
    }
  }

  const handleSectionClick = (
    sectionName: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    playSound()
    event.currentTarget.classList.add('clicked')
    setTimeout(() => {
      event.currentTarget.classList.remove('clicked')
    }, 300)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    event.currentTarget.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.transform = 'scale(1) rotateX(0) rotateY(0)'
  }

  return (
    <div className="app">
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      <div className="central-logo">
        <h1>UNITEC</h1>
        <span>Universidad Tecnológica del Centro</span>
      </div>

      <div className="grid-container">
        <Link
          to="/tour-virtual"
          className="section section-1"
          onClick={(e) => handleSectionClick('Tour Virtual', e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="section-content">
            <div className="section-icon">🌐</div>
            <h2 className="section-title">Tour Virtual</h2>
          </div>
        </Link>

        <Link
          to="/mapa"
          className="section section-2 text-end"
          onClick={(e) => handleSectionClick('Mapa Universitario', e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="section-content">
            <div className="section-icon">🗺️</div>
            <h2 className="section-title">Mapa Universitario</h2>
          </div>
        </Link>

        <Link
          to="/busqueda"
          className="section section-3"
          onClick={(e) => handleSectionClick('Secciones/Búsqueda', e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="section-content">
            <div className="section-icon">🔍</div>
            <h2 className="section-title">Búsqueda por Secciones</h2>
          </div>
        </Link>

        <Link
          to="/ayuda"
          className="section section-4 text-end"
          onClick={(e) => handleSectionClick('Ayuda', e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="section-content">
            <div className="section-icon">💬</div>
            <h2 className="section-title">Explicacion de Instalaciones</h2>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home
