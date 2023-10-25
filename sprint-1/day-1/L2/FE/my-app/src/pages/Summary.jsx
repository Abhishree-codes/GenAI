import { Button, Flex, Input, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';

function Summary() {
    const baseServerURL = "http://localhost:8080"
    const[loading,setLoading] = useState(false)
  const [fileContents, setFileContents] = useState([]);
  const [inpText,setInpText] = useState("")
  const [summary,setSummary] = useState("")

  function handleFileUpload(event) {
    const files = event.target.files;

    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const fileContent = e.target.result;
          resolve(fileContent);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsText(file);
      });
    });

    Promise.all(promises)
      .then((contents) => {
        setFileContents(contents);
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  }

  const handleGenerate=()=>{
    setLoading(true)
    let bodyArr=[]
    if(inpText){
        bodyArr = [...fileContents,inpText]
    }else{
        bodyArr=[...fileContents]
    }
    axios.post(`${baseServerURL}/summary`,{documents:bodyArr}).then((res)=>{
        console.log(res)
        setSummary(res.data)
        setLoading(false)
        setFileContents([])
        setInpText("")
    }).catch((error)=>{
        console.log(error)
    })
  }

  return (
    <>
    <NavBar/>
    <Flex  flexDirection={"column"} justifyContent={"space-between"} height={"100vh"} padding={10}>
        <Textarea border={"none"} height={"full"} isDisabled={true}  value={summary}></Textarea>
        <Flex flexDirection={"column"} alignItems={"flex-start"} textAlign={"left"} gap={5}>
      <h1>Upload text files</h1>
      <input type="file" multiple onChange={handleFileUpload} />
      <h1>You can also add text yourself!</h1>
      <Flex width={"100%"} gap={5}>
<Input isDisabled={loading} placeholder='type your text here' value={inpText} onChange={(e)=>{setInpText(e.target.value)}}/>
<Button isLoading={loading} loadingText={"Generating"} onClick={handleGenerate}>Generate Summary</Button>
</Flex>
</Flex>
    </Flex>
    </>
  );
}

export default Summary;
