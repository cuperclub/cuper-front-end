import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
