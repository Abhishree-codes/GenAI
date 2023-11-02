import React, { useState } from "react";
import { Button, Flex, Input, Link as ChakraLink } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginReq } from "../redux/action";
import axios from "axios";

function Login() {
  const [registerClick, setRegisterClick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const baseURL="http://localhost:8080"

  const handleLogin=()=>{
    dispatch(loginReq({email,password})).then(()=>{
      navigate(location.state,{replace:true})
    })
  }
  const handleRegister=()=>{
    axios.post(`${baseURL}/users/register`,{email:newEmail,password:newPassword}).then((res)=>{
      alert("registeration successful")
      setRegisterClick(false)

    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <>
      {registerClick ? (
        <Flex direction={"column"}>
          <Input
          type="email"
          placeholder="enter email"
          value={newEmail}
          onChange={(e)=>{setNewEmail(e.target.value)}}

          />
          <Input 
          type="password"
          placeholder="enter password"
          value={newPassword}
          onChange={(e)=>{setNewPassword(e.target.value)}}
          />
          <Button onClick={handleRegister}>Register</Button>
          <ChakraLink onClick={()=>{setRegisterClick(false)}}>Already a user? Login here</ChakraLink>
        </Flex>
      ) : (
        <Flex direction={"column"}>
          {" "}
          <Input
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button onClick={handleLogin}>Login</Button>
          <ChakraLink
            onClick={() => {
              setRegisterClick(true);
            }}
          >
            Not a user? Sign up
          </ChakraLink>{" "}
        </Flex>
      )}
    </>
  );
}

export default Login;
