import { ERROR, FOLLOWERREPO, FOLLOWERUSERDATA, GETFOLLOWERS, LOADING, REPOSUCCESS, USERDATASUCCESS } from "./actionTypes"

const initState={
    username : "",
    userData:{},
    isLoading : false,
    isError: false,
    repos:[],
    cache:{},
    followers:[]
}

export const reducer = (state=initState,{type,payload})=>{
    switch(type){
        case LOADING:{
            return {...state, isLoading: true}
        }
        
        case REPOSUCCESS:{
            if(payload.exists){
                return {...state,repos:{...payload}}
            }
          return {...state,repos: payload.data,cache:{...state.cache,[payload.name]:{...state.cache[payload.name],repos:payload.data}}}
        }
        
        case USERDATASUCCESS:{
              
            if(payload.exists){
                return {...state,userData:{...payload}}
            }
            return {...state,userData: payload.data,cache:{...state.cache,[payload.name]:{...state.cache[payload.name],userData:payload.data}}}
        }
        
        case ERROR:{
            return {...state, isLoading:false, isError:true}
        }
        case GETFOLLOWERS:{
            
            return {...state,followers:[...payload]}
        }
     
        default: return state
    }
}