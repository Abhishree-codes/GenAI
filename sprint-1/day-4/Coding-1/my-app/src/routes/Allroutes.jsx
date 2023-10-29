import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../pages/Home'
import RepoList from '../pages/RepoList'
import SingleRepo from '../pages/SingleRepo'
import FollowersList from '../pages/FollowersList'
export default function Allroutes() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:name' element={<RepoList/>}/>
      <Route path='/repo/:id' element={<SingleRepo/>}/>
      <Route path='/:name/followers' element={<FollowersList/>}/>
    </Routes>
  )
}
