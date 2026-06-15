import { Navigate,
    useLocation,
 } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } =
    useAuth()

  const location =
    useLocation()

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
            from: location,
        }}
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute