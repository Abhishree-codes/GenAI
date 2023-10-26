const express = require("express")
const cors = require("cors")
const OpenAI = require("openai");
const axios = require("axios")
const fetch = (...args)=>import("node-fetch").then(({default:fetch})=>fetch(...args))

const bodyParser = require('body-parser');



require("dotenv").config()
const CLIENT_SECRET=process.env.CLIENT_SECRET
const CLIENT_ID= process.env.CLIENT_ID
const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });


const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());

const baseURL="http://api.openai.com/v1/chat/completions"

app.get("/",(req,res)=>{
    res.send("Code Converter Backend :)")
})

app.get("/getAccessToken",async (req,res)=>{

  const params = "?client_id=" +CLIENT_ID+"&client_secret="+CLIENT_SECRET+ "&code="+  req.query.code
  try {
    await fetch("https://github.com/login/oauth/access_token"+params,{
      method:"POST",
      headers:{
        "Accept":"application/json"
      }
    }).then((response)=>{return response.json()}).then((data)=>{
      console.log(data)
      res.json(data)
    })
  } catch (error) {
    
  }
})

app.get("/getUserData",async (req,res)=>{
  
  try {
    await fetch("https://api.github.com/user",{
      method:"GET",
      headers:{
        "Authorization": req.get("Authorization")
      }
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      console.log(data)
      res.json(data)

    })
  } catch (error) {
    
  }
})

app.get("/push", async (req,res)=>{
  const {owner,repo,message,committerName,committerEmail,content,path} = req.body

  
  //const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  //console.log(url)
  const url= "https://github.com/Abhishree-codes/test/blob/main/README.md"
  const requestBody = {
    message,
    committer: {
      name: committerName,
      email: committerEmail
    },
    content,
    "sha": "83c831f0b085c70509b1fbb0a0131a9a32e691ac",
  };
  const options = {
    method: 'PUT',
    headers:{
      "Authorization": req.get("Authorization"),
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      "Accept": "application/vnd.github+json"
    },
    body: JSON.stringify(requestBody)
  };
  try {
    await fetch(url,options).then((response)=>{
      return response.json()
    }).then((data)=>{
      console.log(data)
      res.json(data)

    })
  } catch (error) {
    console.log(error)
  }
})

async function getConvertedCode(code,lang){
    try {
        const res = await openai.chat.completions.create(
        {
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": `You are a helpful assistance who converts the given code into ${lang}. Only return the converted code, nothing else.`
              },
              {
                "role":"user",
                "content":` convert this code: ${code}`
              }
            ],
            "temperature": 1,
            "max_tokens": 256,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
          }
        )
        return res.choices[0].message.content
    } catch(error) {
        throw Error
    }
}


app.post("/convert/:lang", async (req,res)=>{
    const {code} = req.body
    const {lang} = req.params
    try {
        const response = await getConvertedCode(code,lang)   
        res.send(response)
    } catch (error) {
        res.status(500).send({"error":"interal server error"})
    }

    
})

async function getDebuggedCode (code){
    try {
        const res = await openai.chat.completions.create(
        {
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": "You are a helpful assistant that debugs the code given and return updated code. Also explain what the issue was and how you fixed it."
              },
              {
                "role":"user",
                "content":` ${code}`
              }
            ],
            "temperature": 1,
            "max_tokens": 100,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
          }
        )
        return res.choices[0].message.content
    } catch(error) {
        console.log(error)
    }
}
app.post("/debug", async (req,res)=>{
    const {code} = req.body
    
    try {
        const response = await getDebuggedCode(code)
        res.send(response)
    } catch (error) {
        res.status(500).send({"error":"internal server error"})
    }
})

async function getQualityCheck(code){
    const prompt = `Please provide a comprehensive code quality assessment for the given code. Evaluate the code based on the following parameters and rate it on a scale of 10, with 10 being the highest rating and 1 being the lowest (example: 9/10):

    1. Code Consistency
    2. Code Performance
    4. Error Handling
    5. Code Testability
    9. Code Readability
    
    Please provide a summary of the code quality assessment, and assign a rating on the 1 to 10 scale for each of the nine parameters mentioned above. A higher rating indicates better quality, while a lower rating suggests areas for improvement.
    `
    try {
        const res = await openai.chat.completions.create(
        {
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": prompt
              },
              {
                "role":"user",
                "content":` ${code}`
              }
            ],
            "temperature": 1,
            "max_tokens": 400,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
          }
        )
        return res.choices[0].message.content
    } catch(error) {
        console.log(error)
    }
   
}

app.post("/quality", async (req,res)=>{
    const {code} = req.body
    try {
        const response = await getQualityCheck(code)
        res.send(response)
    } catch (error) {
        res.status(500).send({"error":"internal server error"})
    }
})
app.listen(8080,()=>{
    console.log("server is running")
})