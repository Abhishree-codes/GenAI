import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsRoutingModule } from './comments-routing.module';
import { AddCommentsComponent } from './components/add-comments/add-comments.component';
import { ViewCommentsComponent } from './components/view-comments/view-comments.component';
import { StoreModule } from '@ngrx/store';
import { commentsReducer } from './comments.reducer';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AddCommentsComponent,
    ViewCommentsComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    FormsModule,
    StoreModule.forFeature('commentsState', commentsReducer),
    BrowserModule

  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CommentsModule { 

}
