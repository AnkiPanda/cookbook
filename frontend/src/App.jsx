import React from 'react'
import NavBar from './Components/NavBar'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Loader from './Components/Loader'
import Feeds from './Components/Feeds'
import Search from './Components/Search'
import Home from './Components/Home'


const App = () => {
  return (
    <>
    <Router>
      <NavBar/>
      <Home/>
      {/* <Search/> */}
      {/* <Loader/> */}
      </Router>
    </>
  )
}

export default App
