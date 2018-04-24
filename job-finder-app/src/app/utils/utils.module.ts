import { NgModule } from '@angular/core';

import { SvgIconComponent } from './svg-icon.component';
import { SvgIconRegistryService } from './svg-icon-registry.service';

@NgModule({
  declarations: [ SvgIconComponent ],
  providers: [ SvgIconRegistryService ],
  exports: [ SvgIconComponent ]
})
export class UtilsModule { }
