import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// Importación lazy de componentes
const Home = lazy(() => import('./pages/Home'))
const TourVirtual = lazy(() => import('./pages/TourVirtual'))
const MapaUniversitario = lazy(() => import('./pages/MapaUniversitario'))
const Busqueda = lazy(() => import('./pages/Busqueda'))
const Ayuda = lazy(() => import('./pages/Ayuda'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/tour-virtual',
    element: <TourVirtual />
  },
  {
    path: '/mapa',
    element: <MapaUniversitario />
  },
  {
    path: '/busqueda',
    element: <Busqueda />
  },
  {
    path: '/ayuda',
    element: <Ayuda />
  }
]
