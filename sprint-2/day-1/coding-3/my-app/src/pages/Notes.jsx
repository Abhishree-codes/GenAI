import { Button, Flex, Heading, Input, SimpleGrid, Text, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'

function Notes() {
  const baseURL="http://localhost:8080"
  const [userNotes,setUserNotes] = useState([])
  const [date,setDate] = useState(new Date())
  const [showTitle,setShowTitle] = useState(false)
  const [showBody,setShowBody] = useState(false)
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
console.log(date)

  const getNotes = ()=>{
    axios.get(`${baseURL}/notes`,{headers:{
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }}).then((res)=>{
      setUserNotes(res.data)
    }).catch((error)=>{
      alert("Internal Server Error. Please refresh page")
      // console.log(error)
    })
  }
  useEffect(()=>{
    getNotes()
  },[])

  const handleDateChange=(date)=>{
    if(date<new Date()){
      alert('You cannot select a date that has already passed.');
      setShowBody(false)
      setShowTitle(false)
    }else{
      const currentDate = new Date();
      currentDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      currentDate.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds());
      setDate(currentDate)
      setShowBody(true)
      setShowTitle(true)
    }

    // console.log(new Date())
  }

  const handleAdd=()=>{

if(date<new Date()){
  alert("You cannot select a date that has already passed.")
  return 
}
    const currentDate = new Date();
      currentDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      currentDate.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds());

    axios.post(`${baseURL}/notes/add`,{title,body,date: currentDate},{
      headers:{
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }).then((res)=>{
      //sort it again 
      let notesToSort = [...userNotes,{...res.data.note}]
      setUserNotes(sortNotes(notesToSort))

    }).catch((error)=>{
      alert("An error occurered while adding your note. Please try again")
      // console.log(error)
    })
    alert("Note Added!")
    setBody("")
    setTitle("")

  }
  const sortNotes = (notesToSort) => {
    notesToSort.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
  
      // Compare dates first
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
  
      // Dates are the same, compare by timestamp including milliseconds
      if (dateA.getTime() > dateB.getTime()) return -1;
      if (dateA.getTime() < dateB.getTime()) return 1;
  
      return 0;
    });
  
    return notesToSort;
  };
  
  
  
  
  return (
    <Flex width={"100%"} padding={20} gap={10} margin={"auto"} direction={{base:"column",sm:"column",md:"row"}}>
  <Flex direction={"column"} gap={10} width={"100%"}>
      <Calendar value={date} onChange={handleDateChange}/>
      {
        showTitle && showBody ? 
        <Flex direction={"column"} width={"80%"} gap={5}>
          <Input isDisabled={true} type='text' value={new Date(date).toLocaleDateString()}/>
          <Input type='text' placeholder={'enter title'} value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
          <Textarea type='text' placeholder='enter content' value={body} onChange={(e)=>{setBody(e.target.value)}}></Textarea>
          <Button onClick={handleAdd}>Add Note!</Button>
          </Flex>:
          <></>
      }
      </Flex>
      <SimpleGrid columns={{base:1,sm:1,md:1}} width={"100%"} spacing={10}>
        {userNotes?.map((ele)=>(
          <Flex textAlign={"left"} padding={5} width={"100%"} height={"200px"} borderRadius={5} boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"} direction={"column"}>
            <Text alignSelf={"flex-start"}>{new Date(ele.date).toLocaleDateString()}</Text>
            <Heading marginTop={5} alignSelf={"flex-start"} fontSize={"lg"}>{ele.title}</Heading>
            <Text marginTop={2} alignSelf={"flex-start"}>{ele.body}</Text>
          </Flex>
        ))}
      </SimpleGrid>
   
    </Flex>
  )
}

export default Notes
