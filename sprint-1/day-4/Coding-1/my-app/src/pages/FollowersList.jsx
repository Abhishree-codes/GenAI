import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRepos, getUserData } from '../redux/action'
import { useNavigate } from 'react-router-dom'

function FollowersList() {
    const followers = useSelector((store)=>store.followers)
    const cache = useSelector((store)=>store.cache)
    const dispatch = useDispatch()
    const navigate = useNavigate()

   
    const handleSeeRepo=(name)=>{
        if(cache[name]){
        
            dispatch(getUserData(name,cache))
                dispatch(getRepos(name,cache))
                    navigate(`/${name}`)
            
           
           }else{
            dispatch(getUserData(name)).then(()=>{
                dispatch(getRepos(name)).then(()=>{
                    navigate(`/${name}`)
                })
            })
          
        }
    }
    
  return (
    <div>
      {followers.map((ele)=>(
        <div style={{display:"flex",flexDirection:"column",gap:5,padding:20,width:"50%",textAlign:"left"}} key={ele?.id} >
            <h1>Name: {ele?.login}</h1>
            <img style={{height:"100px", width:"100px", borderRadius:5}} src={ele?.avatar_url} alt='follower'></img>
            <button style={{width:"170px"}} onClick={()=>{handleSeeRepo(ele?.login)}}>See repos</button>
        </div>
      ))}
    </div>
  )
}

export default FollowersList
