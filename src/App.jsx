import { Routes, Route, Navigate } from "react-router-dom"
import DisplayingData from "./pages/DisplayingData"
import RenderList from "./pages/RenderList"
import Events from "./pages/RespondingEvents"
import AlterData from "./pages/AlterData"
import ButtonWorkSeparately from "./pages/ButtonWorkSeparately"
import ButtonWorkTogether from "./pages/ButtonWorkTogether"
import TicTocToe from "./pages/TicTocToe"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/display-data" />}></Route>
      <Route path="/display-data" element={<DisplayingData />}></Route>
      <Route path="/render-list" element={<RenderList />} ></Route>
      <Route path="/responding-events" element={<Events />}></Route>
      <Route path="/alter-data" element={<AlterData />}></Route>
      <Route path="/button-work-separately" element={<ButtonWorkSeparately />}></Route>
      <Route path="/button-work-together" element={<ButtonWorkTogether />}></Route>
      <Route path="/tic-toc-toe" element={<TicTocToe />}></Route>
    </Routes>
  )
}

export default App
