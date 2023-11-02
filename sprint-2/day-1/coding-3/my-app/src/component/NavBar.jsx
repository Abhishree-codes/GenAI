import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Button} from '@chakra-ui/react'
import {Link } from 'react-router-dom'
import { LOGOUT } from '../redux/actionTypes'

function NavBar() {
    const isAuth = useSelector((store)=>store.isAuth)
    const dispatch = useDispatch()

    const handleLogout = ()=>{
        localStorage.setItem("token","")
        dispatch({type:LOGOUT})
    }

  return (
    <div>
      {isAuth ? <Button onClick={handleLogout}>Logout</Button>:<Link to={"/"}><Button>Login</Button></Link>}
    </div>
  )
}

export default NavBar
