import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
