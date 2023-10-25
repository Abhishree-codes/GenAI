const express = require("express");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());



const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});





const generateContent = async(topic,type,textToTranslate="")=>{
   
  try {
    let prompt= ""
    if(type==="generate"){
       prompt= `Produce engaging, human-like text on the topic of ${topic}.Limit to one paragraph.`;
    }else if(type==="translate"){
        prompt=`Translate this text to ${topic}: "${textToTranslate}"`;
    }else if(type==="summary"){
        prompt=`Deliver a concise summary of this text: ${topic}`
    }
    let response = await  openai.chat.completions.create({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "temperature": 1,
        "max_tokens": 250,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
      })
    return response.choices[0].message.content;
  } catch (error) {
   return error;
  }
}


// endpoints
app.get("/", (req, res) => {
  res.send("Content Generation application backend");
});



app.get("/generate/:topic", async (req, res) => {
  const {topic} = req.params;
  let textGenerated  = await generateContent(topic,"generate");
  res.send(textGenerated );
});

app.post("/summary", async (req, res) => {
    const {textToBeSummarized} = req.body;
    let summaryGenerated  = await generateContent(textToBeSummarized,"summary");
    res.send(summaryGenerated)
});

app.post("/translate/:lang", async (req,res)=>{
    const {lang} = req.params
    const {textToTranslate} = req.body
    let translatedText = await generateContent(lang,"translate",textToTranslate)
    res.send(translatedText)
})

app.listen(8081, () => {
  console.log("Listening on port 8080");
});