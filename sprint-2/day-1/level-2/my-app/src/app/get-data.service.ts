import { Injectable } from '@angular/core';
import axios from "axios"
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  

  async getProducts():Promise<Product[]>{

    try {
      let gotData = []
   
        let res = await axios.get("https://s2d2server.onrender.com/products")
        //console.log(res)
      gotData = res.data.map((ele:Product)=>{
        return {...ele,cart:false}
      })
      return gotData as Product[]
    } catch (error) {

      return Promise.reject(error)
  }
    
  }
  constructor() { 
    
  }
}
