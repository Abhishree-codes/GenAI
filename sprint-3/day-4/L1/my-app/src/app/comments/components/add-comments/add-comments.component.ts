import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommentStructure } from '../../comments.reducer';
import { ActivatedRoute } from '@angular/router';
import { ADD } from '../../comments.actions';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})
export class AddCommentsComponent implements OnInit{

  //make this a protected route 
  productDetails:any[]=[]

  username = ""
  productID:number=0
  content :string=""

  onAddComment(){
    console.log(this.content)
if(this.content===""){
  alert("Please enter a comment")
  return 
}
  this.store.dispatch(ADD({username:this.username,content:this.content,productID:this.productID}))
alert("Comment Added!")
}

  ngOnInit(): void {


    const logged = localStorage.getItem("logged")

  const user = logged ? JSON.parse(logged) : {name:""}
  this.username = user.name




    this.route.params.subscribe(params=>{
      const id =params['id']
      this.productID = +id
    })
  }
  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement; // Asserting the type to HTMLInputElement
  
    if (target) {
      this.content = target.value; // Update the component property
      // Additional logic
    }
  }
  
  

  constructor(private store: Store<{commentsState:{comments:CommentStructure[]}}>,private route:ActivatedRoute){
  }
}
