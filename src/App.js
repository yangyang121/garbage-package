import React, { useRef } from "react"
import Home from "./containers/Home"
import "./App.css"

function App() {
  const homeEl = useRef(null)
  const handleClick = () => {
    homeEl.current.click()
  }
  return (
    <div className="App">
      <Home ref={homeEl} title="Test" />
      <button onClick={handleClick}>click</button>
    </div>
  )
}

export default App
