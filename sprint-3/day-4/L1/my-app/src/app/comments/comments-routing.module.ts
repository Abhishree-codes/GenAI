import { RouterModule, Routes } from "@angular/router";
import { ViewCommentsComponent } from "./components/view-comments/view-comments.component";
import { AddCommentsComponent } from "./components/add-comments/add-comments.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
    {path:':id/view',component:ViewCommentsComponent},
    {path:':id/add',component:AddCommentsComponent}
];


@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

export class CommentsRoutingModule { 
  
}
