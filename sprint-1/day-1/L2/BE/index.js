const express = require("express");
require("dotenv").config();
const OpenAI = require("openai");
const app = express();
const cors = require("cors");
const session = require("express-session");
app.use(express.json());
app.use(cors());
app.use(
    session({
      secret: process.env.OPENAI_SECRET_KEY,
      resave: false,
      saveUninitialized: true,
    })
  );


const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});







app.get("/", (req, res) => {
  res.send("Content Generation application backend");
});



app.get("/generate/:topic", async (req, res) => {
  const {topic} = req.params;
  const conversationContext = session.conversationContext || [{"role": "system",content:`Produce engaging, human-like text, be helpful while adding witty remarks. Limit to a pararaph`}]
  conversationContext.push({ role: 'user', content:`${topic}` });
  console.log(conversationContext)
  try {
    
    let response = await  openai.chat.completions.create({
        "model": "gpt-3.5-turbo",
        "messages": conversationContext,
        "temperature": 1,
        "max_tokens": 250,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
      })

      const assistantResponse = response.choices[0].message.content;
      conversationContext.push({ role: 'assistant', content: assistantResponse });
    session.conversationContext = conversationContext;
  
    res.send(assistantResponse );
  } catch (error) {
    res.status(500).send({"error":"internal server error"})
  }
});

app.get("/new",(req,res)=>{
    session.conversationContext =  [{"role": "system",content:`Produce engaging, human-like text, be helpful while adding witty remarks. Produce engaging, human-like text, be helpful while adding witty remarks. Limit to a pararaph`}];
    
            res.send('Conversation context cleared');
        
      
})

app.post("/summary", async (req, res) => {
    const documents = req.body.documents;

  
    const summaries = [];

   const summaryContext = session.summaryContext||'You are a helpful assistant that summarizes documents'
  
    for (const document of documents) {
        let summaryGenerated  = await generateSummary(document,summaryContext);
       
        summaries.push(summaryGenerated);
        
        session.summaryContext = `You are a helpful assistant that summarizes documents. Previous summary: ${summaryGenerated}`;
        //await sleep(30000)
      }
   
    res.send(summaries.join(" "))
});


function splitText(text) {
    const maxChunkSize = 500;
    const chunks = [];
    let currentChunk = '';
  
    text.split('.').forEach((sentence) => {
      if (currentChunk.length + sentence.length < maxChunkSize) {
        currentChunk += sentence + '.';
      } else {
        chunks.push(currentChunk.trim());
        currentChunk = sentence + '.';
      }
    });
  
    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }
  
    return chunks;
  }

  async function generateSummary(text,summaryContext) {
    const inputChunks = splitText(text);
    const outputChunks = [];

    for (let i = 0; i < inputChunks.length; i += 3) {
        let batchChunks=[]
        if(inputChunks.length>3){
        batchChunks = inputChunks.slice(i, i + 3);
       }else{
        batchChunks=[...inputChunks]
       }
    
        for (const chunk of batchChunks) {
            try {
              const response = await sendAPIRequest(chunk,summaryContext);
      
              const summary = response.choices[0].message.content.trim();
              outputChunks.push(summary);
      
              
              
            } catch (error) {
               
              console.error('Error:', error);
            }
          }
          console.log(outputChunks)
         // if (i + 3 < inputChunks.length) {
            await sleep(40000);
         // }
      }
   
  
    return outputChunks.join(' ');
  }

  async function sendAPIRequest( text,summaryContext) {
    return openai.chat.completions.create({
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: 'system', content: summaryContext },
        {
          "role": "user",
          "content": `Please summarize the following text:\n${text}\n\nSummary:`
        }
      ]
    });
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

app.post("/analyze", async (req,res)=>{
    try {
        const text = req.body.text; 
        const result = await analyzeSentiment(text);
    
        
        res.status(200).json(result);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})
async function analyzeSentiment(text) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are an assistant that performs sentiment and emotion analysis. You can receive the text in any language, you should analyze it and return a score out of 5 for emotion analysis in the first sentence, and a score out of 5 for sentiment analysis in the second sentence. Example format: "Emotion Analysis: 4 out of 5 \n Sentiment Analysis: 1 out of 5"` },
        { role: 'user', content: text },
      ],
      temperature: 0.5,
      max_tokens: 250,
    });
  
    const analysis = response.choices[0].message.content.trim();
  
   
    const sentiment = analysis.split("\n")[1].trim().split(":")[1].trim()[0];
    const emotions = analysis.split("\n")[0].trim().split(":")[1].trim()[0];
  
    return { sentiment, emotions };
  }
  
app.listen(8080, () => {
  console.log("Listening on port 8080");
});