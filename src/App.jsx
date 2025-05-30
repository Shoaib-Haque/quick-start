import { Routes, Route, Navigate } from "react-router-dom"
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />}></Route>
      <Route path="/home" element={<LandingPage />}></Route>
    </Routes>
  )
}

export default App
