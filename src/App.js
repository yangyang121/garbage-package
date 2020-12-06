import React, { useRef } from "react"
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Router from "./package/react-router/react-router-dom/BrowserRouter"
import Switch from "./package/react-router/react-router/Switch"
import Route from "./package/react-router/react-router/Route"
import Home from "./containers/Home"
import Login from "./containers/Login"
import Backend from "./containers/Backend"
import Admin from "./containers/Admin"
import "./App.css"

function App() {
  const homeEl = useRef(null)
  const handleClick = () => {
    homeEl.current.click()
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/backend" component={Backend} />
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      {/* <Home ref={homeEl} title="Test" /> */}
      <button onClick={handleClick}>click</button>
    </div>
  )
}

export default App
