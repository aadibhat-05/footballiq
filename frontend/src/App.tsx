import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import PlayerPage from './pages/PlayerPage'

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
      </Routes>
    </AppLayout>
  )
}

export default App