import { GameMap } from "./components/GameMap"
import { mapData } from "./components/GameMap/data"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { routes } from "./constants"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signUp} element={<SignUp />} />
          <Route
            path={routes.main}
            element={
              <GameMap
                data={mapData as any[]}
                onProvinceClick={(currentProvince) => {
                  console.log(currentProvince)
                }}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
