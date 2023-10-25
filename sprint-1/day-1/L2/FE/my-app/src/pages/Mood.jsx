import { Button, Flex, Input, InputGroup, InputRightElement, Textarea, useTagStyles } from '@chakra-ui/react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React, { useEffect, useState } from 'react'
import {BsFillMicFill,BsFillArrowRightSquareFill} from "react-icons/bs"
import axios from "axios"
import NavBar from '../components/NavBar';

function Mood() {
    const baseServerURL = "http://localhost:8080"
    const [responseText, setResponseText] = useState("")

    const [loading, setIsLoading] = useState(false);
    const [listening,setListening] = useState(false)
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    let { transcript, browserSupportsSpeechRecognition,resetTranscript } = useSpeechRecognition();
    const [userMood,setUserMood] = useState("")

    const handleSubmit = ()=>{

        setIsLoading(true)
        axios.post(`${baseServerURL}/analyze`,{text:userMood}).then((res)=>{
            setResponseText(res.data)
            setIsLoading(false)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleListenClick = ()=>{
        setListening(!listening)
        listening ? startListening():SpeechRecognition.stopListening()
        

    }

    useEffect(()=>{
        setUserMood(transcript)
    },[transcript])

 //   console.log(transcript)
  return (
    <>
    <NavBar/>
    <Flex flexDirection={"column"} justifyContent={"space-between"} height={"100vh"} padding={10}>

        <Textarea border={"none"} height={"full"} isDisabled={true} value={ responseText ? `your emotions are at a ${responseText.emotions} out of 5 and your sentiment is at a ${responseText.sentiment} out of 5, based on what you said`:""}></Textarea>
        <Flex gap={5} alignItems={"center"}>
      
    
      <Input placeholder='How are you feeling today?' value={userMood} onChange={(e)=>{setUserMood(e.target.value)}}/>
      <Button onClick={handleListenClick}><BsFillMicFill /></Button>
      <Button isLoading={loading}><BsFillArrowRightSquareFill onClick={handleSubmit}/></Button>
      </Flex>
    </Flex>
    </>
  )
}

export default Mood

