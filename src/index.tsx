import 'tailwindcss/tailwind.css'
import './styles.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes/routes.config'
import Suspense from './components/common/Suspense'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense>
    <RouterProvider router={router} />
  </Suspense>
)
