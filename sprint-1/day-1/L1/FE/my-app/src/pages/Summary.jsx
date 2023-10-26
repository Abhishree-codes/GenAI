import { Button, Flex, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import {Textarea} from "@chakra-ui/react"
import NavBar from '../components/NavBar'
function Summary() {
  const [topic,setTopic] = useState("")
  const [generatedText,setGeneratedText] = useState("")
  const[loading,setLoading] = useState(false)
  const baseServerURL="https://content-gen-one-api.vercel.app"

  const handleGen = ()=>{
    setLoading(true)
    axios.post(`${baseServerURL}/summary`,{textToBeSummarized:topic}).then((res)=>{
      setLoading(false)
      setGeneratedText(res.data)
      setTopic("")
      console.log(res)
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <>
    <NavBar/>
   
    <Flex flexDirection={"column"} justifyContent={"space-between"} height={"100vh"} padding={10}>
      <Textarea border={"none"} height={"full"} isDisabled={true} value={generatedText}></Textarea>
      <Flex gap={5}>
      <Input placeholder="Enter the text you want summarized"s isDisabled={loading} value={topic} onChange={(e)=>{setTopic(e.target.value)}}/>
      <Button isLoading={loading} loadingText={"Generating"} onClick={handleGen}>Generate Text</Button>
      </Flex>
    </Flex>
    </>
  )
}

export default Summary
