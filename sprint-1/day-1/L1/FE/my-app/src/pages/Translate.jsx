import React, { useState } from 'react'
import axios  from "axios"
import NavBar from '../components/NavBar'
import { Button, Flex, Input, Select, Textarea } from '@chakra-ui/react'
function Translate() {
    const [topic,setTopic] = useState("")
    const [generatedText,setGeneratedText] = useState("")
    const[loading,setLoading] = useState(false)
    const [ lang, selectedLang] = useState("English")
    const baseServerURL="https://content-gen-one-api.vercel.app"
  
    const handleTranslate = ()=>{
      setLoading(true)
      axios.post(`${baseServerURL}/translate/${lang}`,{textToTranslate:topic}).then((res)=>{
        setLoading(false)
        setGeneratedText(res.data)
        setTopic("")
        console.log(res)
      }).catch((error)=>{
        console.log(error)
      })
    }
    return (
      <>
      <NavBar/>
     
      <Flex flexDirection={"column"} justifyContent={"space-between"} height={"100vh"} padding={10}>
        <Textarea border={"none"} height={"full"} isDisabled={true} value={generatedText}></Textarea>
        <Flex gap={3}>
        <Input placeholder="Enter the text you want translated"s isDisabled={loading} value={topic} onChange={(e)=>{setTopic(e.target.value)}}/>
        <select style={{borderRadius:5, padding:4, width:"150px"}} value={lang} onChange={(e)=>{selectedLang(e.target.value)}}>
            <option value={""}>Choose a Language to translate to</option>
  <option value="Afrikaans">Afrikaans</option>
  <option value="Albanian">Albanian</option>
  <option value="Arabic">Arabic</option>
  <option value="Armenian">Armenian</option>
  <option value="Basque">Basque</option>
  <option value="Bengali">Bengali</option>
  <option value="Bulgarian">Bulgarian</option>
  <option value="Catalan">Catalan</option>
  <option value="Cambodian">Cambodian</option>
  <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
  <option value="Croatian">Croatian</option>
  <option value="Czech">Czech</option>
  <option value="Danish">Danish</option>
  <option value="Dutch">Dutch</option>
  <option value="English">English</option>
  <option value="Estonian">Estonian</option>
  <option value="Fiji">Fiji</option>
  <option value="Finnish">Finnish</option>
  <option value="French">French</option>
  <option value="Georgian">Georgian</option>
  <option value="German">German</option>
  <option value="Greek">Greek</option>
  <option value="Gujarati">Gujarati</option>
  <option value="Hebrew">Hebrew</option>
  <option value="Hindi">Hindi</option>
  <option value="Hungarian">Hungarian</option>
  <option value="Icelandic">Icelandic</option>
  <option value="Indonesian">Indonesian</option>
  <option value="Irish">Irish</option>
  <option value="Italian">Italian</option>
  <option value="Japanese">Japanese</option>
  <option value="Javanese">Javanese</option>
  <option value="Korean">Korean</option>
  <option value="Latin">Latin</option>
  <option value="Latvian">Latvian</option>
  <option value="Lithuanian">Lithuanian</option>
  <option value="Macedonian">Macedonian</option>
  <option value="Malay">Malay</option>
  <option value="Malayalam">Malayalam</option>
  <option value="Maltese">Maltese</option>
  <option value="Maori">Maori</option>
  <option value="Marathi">Marathi</option>
  <option value="Mongolian">Mongolian</option>
  <option value="Nepali">Nepali</option>
  <option value="Norwegian">Norwegian</option>
  <option value="Persian">Persian</option>
  <option value="Polish">Polish</option>
  <option value="Portuguese">Portuguese</option>
  <option value="Punjabi">Punjabi</option>
  <option value="Quechua">Quechua</option>
  <option value="Romanian">Romanian</option>
  <option value="Russian">Russian</option>
  <option value="Samoan">Samoan</option>
  <option value="Serbian">Serbian</option>
  <option value="Slovak">Slovak</option>
  <option value="Slovenian">Slovenian</option>
  <option value="Spanish">Spanish</option>
  <option value="Swahili">Swahili</option>
  <option value="Swedish ">Swedish </option>
  <option value="Tamil">Tamil</option>
  <option value="Tatar">Tatar</option>
  <option value="Telugu">Telugu</option>
  <option value="Thai">Thai</option>
  <option value="Tibetan">Tibetan</option>
  <option value="Tonga">Tonga</option>
  <option value="Turkish">Turkish</option>
  <option value="Ukrainian">Ukrainian</option>
  <option value="Urdu">Urdu</option>
  <option value="Uzbek">Uzbek</option>
  <option value="Vietnamese">Vietnamese</option>
  <option value="Welsh">Welsh</option>
  <option value="Xhosa">Xhosa</option>
</select>
    
        <Button width={"150px"} isLoading={loading} loadingText={"Translating"} onClick={handleTranslate}>Translate Text</Button>
        </Flex>
      </Flex>
      </>
    )
}

export default Translate
