import React from "react"
import Routes from "./Routes"
import { BrowserRouter as Router } from "react-router-dom"
import { getCurrentUser } from "./store/authSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    getCurrentUser();
  },[dispatch])
  return (
    <Router>
      <Routes/>
    </Router>
  )
}

export default App
