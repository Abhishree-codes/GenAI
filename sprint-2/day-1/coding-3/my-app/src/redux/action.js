import axios from "axios"
import { LOGIN_FAILURE, LOGIN_REQ, LOGIN_SUCCESS } from "./actionTypes"

const baseURL="http://localhost:8080"
export const loginReq=({email,password})=>(dispatch)=>{
    dispatch({type:LOGIN_REQ})
    return axios.post(`${baseURL}/users/login`,{email,password}).then((res)=>{
        dispatch({type:LOGIN_SUCCESS})
    }).catch((error)=>{
        console.log(error)
        dispatch({type:LOGIN_FAILURE,payload:error?.data?.message})
    })
}
