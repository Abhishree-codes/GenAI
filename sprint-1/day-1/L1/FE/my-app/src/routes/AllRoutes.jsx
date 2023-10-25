import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Summary from '../pages/Summary'
import Translate from '../pages/Translate'
import Generate from '../pages/Generate'
import Home from '../pages/Home'

function AllRoutes() {
  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/summary" element={<Summary/>}/>
    <Route path="/translate" element={<Translate/>}/>
    <Route path="/gen" element={<Generate/>}/>
</Routes>
  )
}

export default AllRoutes
