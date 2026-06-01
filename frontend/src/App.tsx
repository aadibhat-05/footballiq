import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import PlayerPage from './pages/PlayerPage'
import ScoutingPage from './pages/ScoutingPage'

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
          element={<PlayerPage />}
        />

        <Route
          path="/scouting"
          element={<ScoutingPage />}
        />
      </Routes>
    </AppLayout>
  )
}

export default App