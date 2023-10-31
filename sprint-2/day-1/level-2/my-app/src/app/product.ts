export class Product {
    id:number=0
  title:string =""
  description:string = ""
  price:number=0
  image:string=""
  date=""
  cart= false
  category=""
  count=0
}
export class CartProduct extends Product{
  
  quantity=0
}
