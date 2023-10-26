import AceEditor from 'react-ace';
import ReactMarkdown from 'react-markdown';
import axios from "axios"
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/javascript";
import './App.css';
import {Select,Button,Flex,Box} from "@chakra-ui/react"
import { useState,useRef, useEffect } from 'react';
import Dots from './components/Dots';


function App() {
  const [reRender,setReRender] = useState(false)
  const [userData,setUserData] = useState({})

  const CLIENT_ID= "a48b02cdbf526b864e63"
  const baseURL="http://localhost:8080"
  // const baseURL="https://code-converter-be.vercel.app"
  //http://localhost:8080
  //https://code-converter-be.vercel.app
  const defaultText= "Enter Your Code here"
  const [codeVal, setCodeVal] = useState(defaultText)
  const [isLoading,setLoading] = useState(false)
  const [conversionLoading,setConversionLoading] = useState(false)
  const [qualityLoading,setQualityLoading] = useState(false)
  const [debugLoading, setDebugLoading] = useState(false)
  const editorRef = useRef(null);

  function loginWithGitHub(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID)
  }
  useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const codeParams = urlParams.get("code")
   // console.log(codeParams)
    if(codeParams && (localStorage.getItem("accessToken")===null)){
      async function getAccessToken(){
        await fetch(`${baseURL}/getAccessToken?code=${codeParams}`,{method:"GET"}).then((res)=>{
          return res.json()
        }).then((data)=>{
          console.log(data)
          if(data.access_token){
            localStorage.setItem("accessToken",data.access_token)
            setReRender(!reRender)
          }
        })
      }
      getAccessToken()
    }
  },[])

  async function getUserData(){
    await fetch(`${baseURL}/getUserData`,{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      console.log(data)
      setUserData(data)
    })
  }

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.editor.focus();
    }
  };
  useEffect(()=>{
    focusEditor()
  })
  function onChange(newValue) {
    setCodeVal(newValue)
    console.log("change", newValue);
  }
  const [code, setCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('Your Output Will Be Shown Here');
  const [language, setLanguage] = useState('');


  const handleConvert = ()=>{
    setConvertedCode("")
    if(!language){
      alert("Please Select A Language to convert to")
      return 
    }else if(!codeVal||codeVal==="Enter Your Code here"){
      alert("Please enter the code you want to convert")
      return
    }
setLoading(true)
setConversionLoading(true)

    axios.post(`${baseURL}/convert/${language}`,{code:codeVal},{headers:{
      "Content-Type":"application/json"
    }}).then((res)=>{
      setConvertedCode(res.data)
      setLoading(false)
      setConversionLoading(false)
    }).catch((error)=>{
      console.log(error)
      setLoading(false)
      setConversionLoading(false)
      alert("A network error occured, please try again!")
     
    })
  }
  const handleDebug=()=>{
    setConvertedCode("")
   if(!codeVal||codeVal==="Enter Your Code here"){
      alert("Please enter the code you want to debug")
      return 
    }
   setLoading(true)
   setDebugLoading(true)
    axios.post(`${baseURL}/debug`,{code:codeVal},{headers:{
      "Content-Type":"application/json"
    }}).then((res)=>{
      setLoading(false)
      setDebugLoading(false)
      setConvertedCode(res.data)
    }).catch((error)=>{
      setLoading(false)
      setDebugLoading(false)
      console.log(error)
      alert("A network error occured, please try again!")
    })
  }
  const handleQualityCheck=()=>{
    setConvertedCode("")
    if(!codeVal||codeVal==="Enter Your Code here"){
       alert("Please enter the code you want us to evaluate")
       return 
     }
    setLoading(true)
    setQualityLoading(true)
     axios.post(`${baseURL}/quality`,{code:codeVal},{headers:{
       "Content-Type":"application/json"
     }}).then((res)=>{
       setLoading(false)
       setQualityLoading(false)
       setConvertedCode(res.data)
     }).catch((error)=>{
       setLoading(false)
       setQualityLoading(false)
       console.log(error)
       alert("A network error occured, please try again!")
     })
  }
  return (
    <div className="App">
    <Flex bg={"#C0C0C0"} justifyContent={"space-between"} padding={5} boxShadow={"box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}>
        <Select
          
        width={"30%"}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">SELECT LANGUAGE</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="typescript">Typescript</option>
          <option value="C++">C++</option>
          {/* Add more options for different languages */}
        </Select>
        <Button loadingText='Converting' isLoading={conversionLoading} isDisabled={isLoading ? true : codeVal ==="" ? true:codeVal===defaultText? true:false} _hover={{bg:"#B2BEB5"}} onClick={handleConvert}>CONVERT</Button>
        <Button loadingText='Debugging' isLoading={debugLoading} isDisabled={isLoading ? true : codeVal ==="" ? true:codeVal===defaultText? true:false} _hover={{bg:"#B2BEB5"}}  onClick={handleDebug}>DEBUG</Button>
        <Button loadingText="Checking" isLoading={qualityLoading} isDisabled={isLoading ? true : codeVal ==="" ? true:codeVal===defaultText? true:false} _hover={{bg:"#B2BEB5"}}  onClick={handleQualityCheck}>QUALITY CHECK</Button>
        {localStorage.getItem("accessToken")? 
        <>
        <Button onClick={()=>{localStorage.removeItem("accessToken"); setReRender(!reRender)}}>Logout</Button>
        <Button onClick={getUserData}>Get User Data</Button>
        </>:
        <Button onClick={loginWithGitHub}>Connect to GitHub</Button>
        }

      </Flex>
      <Flex padding={5} gap={0} bg={"#E5E4E2"}>
<Box width={"50%"} border={"1px dashed"} padding={5}>
      <AceEditor 
    ref={editorRef}
    value={codeVal}
   height='100vh'
   width={"100%"}
    setOptions={{ useWorker: false }}
    mode="javascript"
    theme="twilight"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    enableBasicAutocompletion={true}
    enableLiveAutocompletion={true}
    enableSnippets={true}
    editorProps={{ $blockScrolling: true }}/>
</Box>
<Box textAlign={"left"} border={"1px dashed"} width={"50%"} padding={5}>
      <h2 style={{color:"black",fontWeight:"bold"}}>Output</h2>
      {isLoading? <Dots/>:""}
      <ReactMarkdown>{convertedCode}</ReactMarkdown>
    
      </Box>
      </Flex>
 
    </div>
  );
}

export default App;
