import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function SingleRepo() {
    let {id} = useParams()
    id = +id
    const {repos} = useSelector((store)=>{
        return {
            repos: store.repos
        }
    },shallowEqual)

    const [repoData,setRepoData] = useState({})
    useEffect(()=>{
        
        setRepoData(repos.filter((ele)=>ele.id === id)[0])
    },[id])
    
   
  return (
    <div>
      <h1>Name : {repoData?.name}</h1>
      <h3>Full Name: {repoData?.full_name}</h3>
      <p>Owner: {repoData?.owner?.login}</p>
      <p>Link: {repoData?.url}</p>
      <p>Description: {repoData?.description? repoData?.description:"--"}</p>
      <p>Watchers: {repoData?.watchers_count}</p>
      <p>Forks: {repoData?.forks_count}</p>
      <p>Visibility: {repoData?.visibility}</p>
      <p>Default Branch: {repoData?.default_branch}</p>
    </div>
  )
}

export default SingleRepo
