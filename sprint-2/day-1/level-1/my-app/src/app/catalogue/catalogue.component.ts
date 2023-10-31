import { Component,OnInit } from '@angular/core';
import { Product } from '../product';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit{
  selectedProduct: Product | null = null;
  products : Product[]= []
  modalVisible = false;
  selectedPrice=""
  selectedName=""
  selectedCategory=""
  cartModalVisibile = false

  openModal(product: Product) {
    this.selectedProduct = product;
    this.modalVisible = true;
   
  }
  closeModal() {
   
    this.modalVisible = false;
    console.log(this.modalVisible)
 }

  sortByName(sortVal:string){

    let data = localStorage.getItem('data');
    let arr :Product[] = data ? [...JSON.parse(data)] : [];

    if(sortVal ==="asc"){
    arr.sort((a:Product,b:Product)=>{
      return a.title.localeCompare(b.title);
    })
    }else if(sortVal==="desc"){
      arr.sort((a:Product,b:Product)=>{
        return b.title.localeCompare(a.title);
      })
    }
    this.products = [...arr]
    this.selectedName = sortVal
  }

  sortByPrice(sortVal:string){
    let data = localStorage.getItem('data');
    let arr :Product[] = data ? [...JSON.parse(data)] : [];
    if(sortVal ==="asc"){
      arr.sort((a:Product,b:Product)=>{
        return a.price-b.price
      })
      }else if(sortVal==="desc"){
        arr.sort((a:Product,b:Product)=>{
          return b.price-a.price
        })
      }
      this.products = [...arr]
      this.selectedPrice = sortVal
  }
  filterByCategory(filterVal:string){
    let data = localStorage.getItem('data');
    let arr :Product[] = data ? [...JSON.parse(data)] : []
    if(filterVal==="men's clothing"){
      this.products = arr.filter((ele)=>ele.category==="men's clothing")
    }else if(filterVal==="jewelery"){
      this.products = arr.filter((ele)=>ele.category==="jewelery")
    }else if(filterVal==="electronics"){
      this.products = arr.filter((ele)=>ele.category==="electronics")
    }else if(filterVal==="women's clothing"){
      this.products = arr.filter((ele)=>ele.category==="women's clothing")
    }else{
      this.products = [...arr]
    }
    this.selectedCategory= filterVal

this.selectedCategory=filterVal
  }


  async ngOnInit(): Promise<void> {
    try {
      this.products = await this.getDataService.getProducts()
    } catch (error) {
      console.log(error)
    }
   
  }
  addToFav(id:number){
     this.products=this.products.map((ele)=>ele.id === id ? {...ele,fav:true}:ele)
    // 
    let data = localStorage.getItem('data');
    let arr :Product[] = data ? JSON.parse(data) : [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr[i].fav = true;
        break; 
      }
    }
    localStorage.setItem("data",JSON.stringify(arr))
  }
  addToCart(id:number){
    this.products = this.products.map((ele)=>ele.id === id? {...ele,cart:true}:ele)
    let data = localStorage.getItem('data');
    let arr :Product[] = data ? JSON.parse(data) : [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr[i].cart = true;
        break; 
      }
    }
    localStorage.setItem("data",JSON.stringify(arr))
  }
  removeFromCart(id:number){
    this.products = this.products.map((ele)=>ele.id === id? {...ele,cart:false}:ele)
    let data = localStorage.getItem('data');
    let arr :Product[] = data ? JSON.parse(data) : [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr[i].cart = false;
        break; 
      }
    }
    localStorage.setItem("data",JSON.stringify(arr))
  }
  removeFromFav(id:number){
   this.products= this.products.map((ele)=>ele.id === id ? {...ele,fav:false}:ele)
   let data = localStorage.getItem('data');
    let arr :Product[] = data ? JSON.parse(data) : [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr[i].fav = false;
        break; 
      }
    }
   localStorage.setItem("data",JSON.stringify(arr))
  }

  constructor(private getDataService: GetDataService){

  }
}
