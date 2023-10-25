import React from 'react'
import {Button, Flex, Heading} from "@chakra-ui/react"
import { Link } from 'react-router-dom'

function Home() {
 
  return (
    <div>
      <Heading mt={10}>Welcome! What would you like to do today?</Heading>
      <Flex width={"50%"} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"} margin={"auto"} gap={5} mt={10}>
      <Link to={"/translate"}> <Button width={"200px"} bgColor={"#c8a2c8"} _hover={{bgColor:"#ba75ba"}} color={"black"}> Translate Text</Button></Link>
        <Link to={"/summary"}><Button width={"200px"} bgColor={"#c8a2c8"} _hover={{bgColor:"#ba75ba"}} color={"black"}>Generate Summary</Button></Link>
        <Link to={"/gen"}> <Button width={"200px"} bgColor={"#c8a2c8"} _hover={{bgColor:"#ba75ba"}} color={"black"}>Generate Text</Button></Link>
      </Flex>
    </div>
  )
}

export default Home