import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div>
     <Link to={"/"}> <button>Home page</button></Link>
    </div>
  )
}

export default Nav
