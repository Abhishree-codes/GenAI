import React from 'react'
import {Routes,Route} from "react-router-dom"
import Login from '../pages/Login'
import Notes from '../pages/Notes'
import PrivateRoute from './PrivateRoute'

function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/notes' element={<PrivateRoute><Notes/></PrivateRoute>}/>

    </Routes>
  )
}

export default AllRoutes
