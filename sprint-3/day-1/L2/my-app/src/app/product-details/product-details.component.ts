import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  id: any=""
  product={title:"",description:"",image:"",price:0}
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
   let products= localStorage.getItem("products")
   let productsToMap = products ? JSON.parse(products) : []

   productsToMap.forEach((ele:any)=>{
    if(ele.id == this.id){
      this.product={...ele}

    }
   })
  }

}
