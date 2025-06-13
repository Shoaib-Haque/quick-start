import { Routes, Route, Navigate } from "react-router-dom"
import DisplayingData from "./pages/DisplayingData"
import RenderList from "./pages/RenderList"
import Events from "./pages/RespondingEvents"
import AlterData from "./pages/AlterData"
import ButtonWorkSeparately from "./pages/ButtonWorkSeparately"
import ButtonWorkTogether from "./pages/ButtonWorkTogether"
import TicTocToe from "./pages/TicTocToe"

const routes = [
  {path: '/', element: DisplayingData, headline: 'Display Data'},
  {path: '/display-data', element: DisplayingData, headline: 'Display Data'},
  {path: '/render-list', element: RenderList, headline: 'Render List'},
  {path: '/responding-events', element: Events, headline: 'Responding Events'},
  {path: '/alter-data', element: AlterData, headline: 'Alter Data'},
  {path: '/button-work-separately', element: ButtonWorkSeparately, headline: 'Button Work Separately'},
  {path: '/button-work-together', element: ButtonWorkTogether, headline: 'Button Work Together'},
  {path: '/tic-toc-toe', element: TicTocToe, headline: 'Tic Toc Toe'},
]

function App() {
  return (
    <Routes>
      {
        routes.map((route) => (
          <Route path={ route.path } element={<route.element headline={route.headline} />} ></Route>
        ))
      }
    </Routes>
  )
}

export default App
