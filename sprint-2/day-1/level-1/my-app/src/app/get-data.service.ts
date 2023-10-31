import { Injectable } from '@angular/core';
import axios from "axios"
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  

  async getProducts():Promise<Product[]>{

    try {
      let data:string|null = localStorage.getItem("data") 
      let gotData = []
      if(!data){
        let res = await  axios.get("https://fakestoreapi.com/products")
       
        gotData = res.data.map((ele:{id:number,title:string,price:number,description:string,category:string,image:string,rating?:{rate:number,count:number}})=>{
          delete ele?.rating
          return {...ele,fav:false}
        })
      }else{
        gotData = JSON.parse(data)
      }
      localStorage.setItem("data",JSON.stringify(gotData))
      return gotData as Product[]
    } catch (error) {

      return Promise.reject(error)
  }
    
  }
  constructor() { 
    
  }
}
