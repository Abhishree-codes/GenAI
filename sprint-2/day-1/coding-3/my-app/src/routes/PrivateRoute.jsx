import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate,useLocation} from 'react-router-dom'

function PrivateRoute({children}) {
    const location = useLocation()
    const isAuth = useSelector((store)=>store.isAuth)
    return isAuth ? children :<Navigate to={"/"} replace={true} state={location.pathname}/>
}

export default PrivateRoute
