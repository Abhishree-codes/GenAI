
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getFollowers } from '../redux/action'

function RepoList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userData,repos} = useSelector((store)=>{
        return {
            userData:store.userData,
            repos:store.repos
        }
    },shallowEqual)

    const handleSeeFollowers = ()=>{
        dispatch(getFollowers(userData?.login)).then(()=>{
            navigate(`/${userData?.login}/followers`)
        })
    }
  return (
    <div style={{padding:10}}>
     <div>
       <h1>Username: {userData?.login}</h1> 
       <img src={userData?.avatar_url} alt='user'></img>
       <p>Location: {userData?.location}</p>
       <p>Name: {userData?.name}</p>
       <p>Public Repos: {userData?.public_repos}</p>
       <p>Followers: {userData?.followers}</p>
       <p>Following: {userData.following}</p>
       <button onClick={handleSeeFollowers}>See followers</button>
     </div>
      <div>
        <div> 
          <h1>Repositories</h1>
          
        {repos?.map((ele,ind)=>(
           <Link to={`/repo/${ele.id}`} key={ind}>
            <div style={{color:"black",textAlign:"left", border:"1px solid black",padding:10,marginBottom:10}}>
               <h1>Name: {ele?.name}</h1>
               <p>{ele.private ? "Private":"Public"}</p>
               <p>Link: {ele.url}</p>
               <p>Description: {ele?.description}</p>
            </div>
            </Link> 
        ))}
        </div>
      </div>
    </div>
  )
}

export default RepoList
