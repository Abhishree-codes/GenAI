import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommentStructure } from '../../comments.reducer';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css']
})
export class ViewCommentsComponent implements OnInit{
  commentsData:CommentStructure[]= []

  id:number= 0
  
  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      const id =params['id']
      this.id = +id
    })
  }

  navigateToAddComments(){
    console.log(this.id)
    this.router.navigate(['comments', this.id, 'add']);
  }
  // constructor(private store: Store<{commentsState:{comments:CommentStructure[]}}>,private router: Router,private route:ActivatedRoute){
  //   console.log(this.store)
  //   this.store.select(state => state.commentsState.comments).subscribe(value => {
  //     console.log(value)
  //     this.commentsData = [...value];
  //   });

  
  // }

  constructor(
    private store: Store<{ commentsState: { comments: CommentStructure[] } }>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.store.select(state => state.commentsState).subscribe(commentsState => {
      console.log(commentsState)
      if (commentsState && commentsState.comments) {
        this.commentsData = [...commentsState.comments];
      }
    });
  }
  
}
