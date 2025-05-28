import { Suspense as ReactSuspense } from 'react'

interface Props {
  children: React.ReactNode
}

const LoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="size-12 animate-spin rounded-full border-y-2 border-white"></div>
  </div>
)

const Suspense = ({ children }: Props) => {
  return <ReactSuspense fallback={<LoadingSpinner />}>{children}</ReactSuspense>
}

export default Suspense
