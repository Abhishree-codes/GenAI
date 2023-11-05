import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
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
  constructor(private http: HttpClient){

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
}
