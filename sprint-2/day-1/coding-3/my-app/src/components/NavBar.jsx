import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Button, Flex} from '@chakra-ui/react'
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
    <Flex justifyContent={"flex-start"} direction={{base:"column",sm:"row",md:"row"}} padding={5} gap={10}>
      {isAuth ? <Button onClick={handleLogout}>Logout</Button>:<Link to={"/"}><Button>Login</Button></Link>}
      <Link to={"/notes"}><Button>Your Notes</Button></Link>
    </Flex>
  )
}

export default NavBar
