import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{


  products : any []=[]
  loading = false
  error = false 
  loadingDivs = new Array(20).fill(null)
  selectedProduct:any|null=null
  modalVisible = false
  selectedPrice=""
  selectedName=""
  selectedCategory=""
  selectedRating = ""

  constructor(private http: HttpClient,private router:Router){

  }
 
  openModal(product:any){
    this.modalVisible= true
    this.selectedProduct= product
  }

  closeModal(){
    this.modalVisible = false 
  }
  ngOnInit(): void {
    this.loading = true 
    this.error = false
    this.http.get("https://fakestoreapi.com/products").subscribe((data:any)=>{
      this.loading= false 
      this.products=[...data]
    },(error)=>{
      console.log(error)
      this.loading=false
      this.error=true
    })

  }
  searchByCategory(value:string){
    if(value===""){
      this.loading = true 
      this.error = false
      this.http.get("https://fakestoreapi.com/products").subscribe((data:any)=>{
        this.loading= false 
        this.products=[...data]
      },(error)=>{
        console.log(error)
        this.loading=false
        this.error=true
      })
    }else if(value==="men's clothing"){
      this.loading = true 
      this.error = false
      this.http.get("https://fakestoreapi.com/products/category/men's%20clothing").subscribe((data:any)=>{
        this.loading= false 
        this.products=[...data]
      },(error)=>{
        console.log(error)
        this.loading=false
        this.error=true
      })
    }else if(value==="jewelery"){
      this.loading = true 
      this.error = false
      this.http.get("https://fakestoreapi.com/products/category/jewelery").subscribe((data:any)=>{
        this.loading= false 
        this.products=[...data]
      },(error)=>{
        console.log(error)
        this.loading=false
        this.error=true
      })
    }else if(value==="electronics"){
      this.loading = true 
      this.error = false
      this.http.get("https://fakestoreapi.com/products/category/electronics").subscribe((data:any)=>{
        this.loading= false 
        this.products=[...data]
      },(error)=>{
        console.log(error)
        this.loading=false
        this.error=true
      })
    }else if(value==="women's clothing"){
      this.loading = true 
      this.error = false
      this.http.get("https://fakestoreapi.com/products/category/women's%20clothing").subscribe((data:any)=>{
        this.loading= false 
        this.products=[...data]
      },(error)=>{
        console.log(error)
        this.loading=false
        this.error=true
      })
    }
    this.selectedCategory= value
  }
  searchByName(value:string){
    if(value!==""){
    this.products=  this.products.filter((product)=>{
      return product.title.toLowerCase().includes(value.toLowerCase());
      })
      
    }else{
      this.loading = true 
      this.error = false
      this.http.get("https://fakestoreapi.com/products").subscribe((data:any)=>{
        this.loading= false 
        this.products=[...data]
      },(error)=>{
        console.log(error)
        this.loading=false
        this.error=true
      })
    }
    this.selectedName= value
  }

  sortByPrice(value:string){
    if(value==="asc"){
      this.products.sort((a,b)=>{
        return a.price-b.price
      })
    }else if(value==="desc"){
      this.products.sort((a,b)=>{
        return b.price-a.price
      })
    }else if(value===""){
      this.loading = true 
      this.error = false
      this.http.get("https://fakestoreapi.com/products").subscribe((data:any)=>{
        this.loading= false 
        this.products=[...data]
      },(error)=>{
        console.log(error)
        this.loading=false
        this.error=true
      })
    }
    this.selectedPrice= value
  }

  sortByRating(value:string){
    if(value==="asc"){
      this.products.sort((a,b)=>{
        return a.rating.rate-b.rating.rate
      })
    }else if(value==="desc"){
      this.products.sort((a,b)=>{
        return b.rating.rate-a.rating.rate
      })
    }else if(value===""){
      this.loading = true 
      this.error = false
      this.http.get("https://fakestoreapi.com/products").subscribe((data:any)=>{
        this.loading= false 
        this.products=[...data]
      },(error)=>{
        console.log(error)
        this.loading=false
        this.error=true
      })
    }
    this.selectedRating= value
  }
  addToCart(product:any){
    //find logged in user 
    //match with users array 
    //update cart in users array 
    //set users array once again 
    let arr = localStorage.getItem("users")
   

    let loggedInUser:any = localStorage.getItem("logged")
    if(!loggedInUser){
      alert("You have to login to add items in your cart")
      return 
    }else{
      loggedInUser = JSON.parse(loggedInUser)
    }
    let cartData:any=[]

    let userData =  arr ? JSON.parse(arr): []

    for(let i =0; i<userData.length; i++){
      if(userData[i].id===loggedInUser.id){
        let flag = false 
       // console.log(userData[i])
        for(let j =0; j<userData[i].cart.length; j++){
         
          if(userData[i].cart[j].id=== product.id ){
            alert("Product is already in cart!")
            flag = true 
            return 
          }
        }
        if(!flag){
       cartData = [...userData[i].cart,{...product,quantity:1}]
        }
      }
    }

    let usersAfterAdding = userData.map((ele:any)=>{
     
      if(ele.id=== loggedInUser.id){
        return {...ele,cart:cartData}
      }else{
        return ele 
      }
    })

    localStorage.setItem("users",JSON.stringify(usersAfterAdding))
    localStorage.setItem("logged",JSON.stringify({...loggedInUser,cart:cartData}))
    alert("item added successfully")
  }

  navigateToCart(){
    let loggedInUser:any = localStorage.getItem("logged")
    if(!loggedInUser){
      alert("You have to be logged in to view your cart")
      return 
    }else{
      loggedInUser= JSON.parse(loggedInUser)
      this.router.navigate(['/cart']);
    }
  }
 
}
