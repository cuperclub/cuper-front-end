import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { MaterialModule } from '../../material.module';
import { ComponentsModule } from '../../components/components.module';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

//Pages
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    ComponentsModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ]
})
export class EmployeeModule { }
