// module-template/module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { <%= className %> } from './<%= name %>.component';

@NgModule({
  declarations: [<%= className %>], // Component declaration
  imports: [CommonModule],
})
export class <%= moduleName %> {
  // Module logic here
}
