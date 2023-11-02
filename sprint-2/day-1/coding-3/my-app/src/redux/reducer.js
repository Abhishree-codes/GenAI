import { LOGIN_FAILURE, LOGIN_REQ, LOGIN_SUCCESS, LOGOUT } from "./actionTypes"

const initState={
    isAuth: false,
    isLoading: false,
    isError:false,
    error:""
}


export const reducer =(state = initState,{type,payload})=>{
    switch(type){
        case LOGIN_REQ:{
            return {...state,isLoading:true,isError:false,error:""}
        }
        case LOGIN_FAILURE:{
            return {...state,isError:true, isLoading:false,error:payload}
        }
        case LOGIN_SUCCESS:{
            return {...state,isLoading:false,isAuth:true,error:""}
        }
        case LOGOUT:{
            return {...state,isAuth:false}
        }
        default: return state
    }
}