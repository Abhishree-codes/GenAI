import axios from "axios"
import { ERROR, GETFOLLOWERS, LOADING, REPOSUCCESS, USERDATASUCCESS } from "./actionTypes"


export const getUserData =  (name, cache = null)=> (dispatch)=>{
    dispatch({type:LOADING})
    if(cache){
        // console.log("yes",name,cache[name].userData)
     dispatch({type:USERDATASUCCESS,payload:{...cache[name].userData,exists: true}})
    }
    return axios.get(`https://api.github.com/users/${name}`).then((res)=>{
      //  console.log(res)
        dispatch({type:USERDATASUCCESS,payload:{name:name,data:res.data}})
    }).catch((error)=>{
        console.log(error)
        dispatch({type:ERROR})
    })
}
export const getRepos = (name,cache=null)=>(dispatch)=>{
  
    if(cache){
        dispatch({type:REPOSUCCESS,payload:{...cache[name].repos,exists: true}})
    }
   return axios.get(`https://api.github.com/users/${name}/repos`).then((res)=>{
       // console.log(res)
        dispatch({type:REPOSUCCESS,payload:{name:name,data:res.data}})
    }).catch((error)=>{
        console.log(error)
        dispatch({type:ERROR})
    })
}

export const getFollowers =(name)=> (dispatch)=>{
    
    return axios.get(`https://api.github.com/users/${name}/followers`).then((res)=>{

           dispatch({type:GETFOLLOWERS,payload:res.data})
        }).catch((error)=>{
            console.log(error)
        })
}
