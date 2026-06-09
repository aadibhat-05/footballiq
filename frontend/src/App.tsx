import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import PlayerPage from './pages/PlayerPage'
import ScoutingPage from './pages/ScoutingPage'
import ShortlistsPage from './pages/ShortlistsPage'
import PlayersPage from './pages/PlayersPage.tsx'

import TestPage from './pages/TestPage'

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

        <Route
          path="/shortlists"
          element={<ShortlistsPage />}
        />

        <Route
          path="/players"
          element={<PlayersPage />}
        />


        <Route
          path="/test"
          element={<TestPage />}
        />
      
      
      </Routes>
    </AppLayout>
  )
}

export default App