import {NgModule} from '@angular/core';
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
@NgModule({
  declarations: [],
  imports: [
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
  ]
})
export class SharedModule {
}
