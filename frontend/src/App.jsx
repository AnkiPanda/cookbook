import React from 'react'
import NavBar from './Components/NavBar'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

const App = () => {
  return (
    <>
    <Router>
      <NavBar/>
      </Router>
    </>
  )
}

export default App
