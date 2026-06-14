import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import PlayerPage from './pages/PlayerPage'
import ScoutingPage from './pages/ScoutingPage'
import ShortlistsPage from './pages/ShortlistsPage'
import PlayersPage from './pages/PlayersPage.tsx'
import TestPage from './pages/TestPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/player/:id"
          element={
            <ProtectedRoute>
              <PlayerPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/scouting"
          element={
            <ProtectedRoute>
              <ScoutingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shortlists"
          
          element={
            <ProtectedRoute>
              <ShortlistsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/players"
          element={
            <ProtectedRoute>
              <PlayersPage />
            </ProtectedRoute>}
        />

        <Route
          path="/test"
          element={<TestPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />
        
        <Route
          path="/signup"
          element={<SignupPage />}
        />
      
      </Routes>
    </AppLayout>
  )
}

export default App