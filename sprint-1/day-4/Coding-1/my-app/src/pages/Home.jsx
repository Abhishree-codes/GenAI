import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getRepos, getUserData } from '../redux/action'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [name,setName] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cache = useSelector((store)=>store.cache)

    const handleSubmit = ()=>{
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
    <div style={{ background: "#66B2B2", border: "1px solid none", borderRadius: "10px", height: "200px",width:"40%",margin:"auto",padding:10,paddingBottom:10,marginTop:20 }}>
      <h1>GitHub Explorer</h1>
    <input type="text" placeholder="enter username" value={name} onChange={(e) => setName(e.target.value)} />
    <button onClick={handleSubmit}>Submit</button>
  </div>
  
  )
}

export default Home
