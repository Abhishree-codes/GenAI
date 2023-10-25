import { Button, Flex, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import {Textarea} from "@chakra-ui/react"
import NavBar from '../components/NavBar'
function Generate() {
  const [topic,setTopic] = useState("")
  const [generatedText,setGeneratedText] = useState("")
  const[loading,setLoading] = useState(false)
  const baseServerURL = "http://localhost:8081"

  const handleGen = ()=>{
    setLoading(true)
    axios.get(`${baseServerURL}/generate/${topic}`).then((res)=>{
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
      <Input placeholder='Enter any topic you would like to generate text on!' isDisabled={loading} value={topic} onChange={(e)=>{setTopic(e.target.value)}}/>
      <Button isLoading={loading} loadingText={"Generating"} onClick={handleGen}>Generate Text</Button>
      </Flex>
    </Flex>
    </>
  )
}

export default Generate
