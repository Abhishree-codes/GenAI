// component-template/component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-<%= name %>', // Component selector
  templateUrl: './<%= name %>.component.html', // HTML file for the component
  styleUrls: ['./<%= name %>.component.<%= style %>'] // Style file (e.g., CSS, SCSS, etc.)
})
export class <%= className %> {
  // Component logic here
}
