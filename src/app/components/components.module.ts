import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

// components
import { FooterComponent } from './footer/footer.component';
import { CardOfficeComponent } from './card-office/card-office.component';



@NgModule({
  declarations: [FooterComponent, CardOfficeComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    FooterComponent,
    CardOfficeComponent
  ]
})
export class ComponentsModule { }
