import {NgModule} from '@angular/core';
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
