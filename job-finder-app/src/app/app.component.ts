import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
      <layout-header></layout-header>
      <div class='container-fluid'>
        <router-outlet></router-outlet>  
      </div>    
      <layout-footer></layout-footer>      
    `
})
export class AppComponent {
  title = 'app';
}
