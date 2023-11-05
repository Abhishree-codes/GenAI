import axios from "axios"
import './App.css';
import {useEffect, useState} from "react"
import {AiOutlineHeart} from "react-icons/ai"
import { Button, Flex, Icon, Image } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
function App() {
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
 const [itemsSelected, setItemsSelected] = useState([])



  useEffect(()=>{
    getData()
  },[])

 
  const handleCheckChange=(id)=>{
    setItems((prev)=>{
      return prev.map((ele)=>{
        if(ele.id === id){
        return {...ele, check: !ele.check}
        
        }else{
          return ele
        }
      })
    })
    //loop through items
    //if ele.check is true then push it 
    //if ele check is false then remove it 
   
   
  }
 
  const [items,setItems] = useState([])
  const getData = ()=>{
    setLoading(true)
    axios.get("https://fakestoreapi.com/products").then((res)=>{
      console.log(res)

      setLoading(false)
      const favData = JSON.parse(localStorage.getItem("favourites"))||[]
     for(let i =0; i<res.data.length; i++){
      let flag = false
      for(let j = 0; j<favData.length; j++){
        if(res.data[i].id === favData[j].id){
          flag = true 
          
        }
      }
      if(flag){
        res.data[i] = {...res.data[i],fav:true}
      }else{
        res.data[i] = {...res.data[i],fav:false}
      }
     }
      setItems(res.data.map((ele)=>{return {...ele,check:false}}))
    }).catch((error)=>{
      console.log(error)
      setLoading(false)

      setError(true)
    })
  }
  useEffect(()=>{
    let addItems = []
    addItems = items.filter((ele)=>ele.check)
    setItemsSelected(addItems)
  },[items])
  
  const handleDeleteItem= (id)=>{
  
      setItems((prev)=>prev.filter((ele)=>ele.id!==id))
    
  }
  const handleDeleteClick=()=>{
    itemsSelected.forEach((ele)=>{
      handleDeleteItem(ele.id)
    })
    alert("items deleted!")
  }

  const handleFavItems = ()=>{
   
    const getFavs =  JSON.parse(localStorage.getItem("favourites"))||[]
    const loopArray = [...getFavs]
    for(let i = 0; i<itemsSelected.length; i++){
      let flag = false

      for(let j = 0; j<loopArray.length; j++){
        if(itemsSelected[i].id === loopArray[j].id){
        flag= true 
        }
      }
      if(!flag){
        getFavs.push(itemsSelected[i])
      }
    }
    let itemsLoop = [...items]
    if(loopArray.length === 0){
      for(let i =0; i<itemsLoop.length; i++){
        let flag = false
        for(let j = 0; j<getFavs.length; j++){
          if(itemsLoop[i].id === getFavs[j].id){
            flag = true 
            
          }
        }
        if(flag){
          itemsLoop[i] = {...itemsLoop[i],fav:true}
        }else{
          itemsLoop[i] = {...itemsLoop[i],fav:false}
        }
       }
       setItems(itemsLoop)
      localStorage.setItem("favourites",JSON.stringify([...itemsSelected]))
      alert("added to favourites!")
      return 
    }
    
    localStorage.setItem("favourites",JSON.stringify([...getFavs]))
    
    for(let i =0; i<itemsLoop.length; i++){
      let flag = false
      for(let j = 0; j<getFavs.length; j++){
        if(itemsLoop[i].id === getFavs[j].id){
          flag = true 
          
        }
      }
      if(flag){
        itemsLoop[i] = {...itemsLoop[i],fav:true}
      }else{
        itemsLoop[i] = {...itemsLoop[i],fav:false}
      }
     }
     setItems(itemsLoop)
     alert("added to favourites!")
  }
 
  if(error){
    alert("An error occurred, please reload the page")
    return
  }
 if(loading){
  return <h1>Loading...</h1>
 }
  return (
    <div className="App">
      
       {itemsSelected.length>0? <Flex padding={10} gap={5} justifyContent={"flex-start"}>
        <Button onClick={handleFavItems}>Fav</Button>
        <Button onClick={handleDeleteClick}>Delete</Button>
        </Flex>:<></>}
      
     
        <TableContainer>
          <Table>
          <Thead>

      <Tr>
        <Th></Th>
        <Th>Title</Th>
        <Th>Price</Th>
        <Th>Image</Th>
        <Th></Th>
      </Tr>
    </Thead>
<Tbody>
{items?.map((ele) => (
  <Tr key={ele.id}>
    <Td>{ele.fav ? <Icon as={AiOutlineHeart} /> : null}</Td>
    <Td>{ele.title}</Td>
    <Td>{ele.price}</Td>
    <Td><Image height={"40px"} width={"40px"} borderRadius={5} src={ele.image}></Image></Td>
    <Td>
      <input type="checkbox" onChange={() => { handleCheckChange(ele.id) }} />
    </Td>
  </Tr>
))}


    </Tbody>
    </Table>
        </TableContainer>
   
     
    </div>
  );
}

export default App;
