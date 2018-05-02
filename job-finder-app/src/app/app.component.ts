import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
      <layout-header></layout-header>
      <router-outlet></router-outlet>
      <layout-footer></layout-footer>      
    `
})
export class AppComponent {
  title = 'app';
}
