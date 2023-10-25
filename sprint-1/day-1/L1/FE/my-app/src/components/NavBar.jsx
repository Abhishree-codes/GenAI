import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <Flex
    px={{ base: 2, sm: 4 }}
    py={4}boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"} justifyContent={"space-evenly"} padding={5} alignItems={"center"}>
        <Link  to={"/translate"}> <Button color={"white"} bgColor={"#c8a2c8"} _hover={{bgColor:"#ba75ba"}}> Translate Text</Button></Link>
        <Link to={"/summary"}><Button color={"white"} bgColor={"#c8a2c8"} _hover={{bgColor:"#ba75ba"}}>Generate Summary</Button></Link>
        <Link to={"/gen"}> <Button color={"white"} bgColor={"#c8a2c8"} _hover={{bgColor:"#ba75ba"}}>Generate Text</Button></Link>
    </Flex>
  )
}

export default NavBar
