import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { MaterialModule } from '../../material.module';
import { ComponentsModule } from '../../components/components.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//Pages
import { TransactionsComponent } from './transactions/transactions.component';

export function createTranslateLoader(http: HttpClient) {
  const x = new TranslateHttpLoader(http, '../assets/i18n/', '.json');
  console.log(x);
  return x;
}

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
