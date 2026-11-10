import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { MaterialModule } from '../../material.module';
import { ComponentsModule } from '../../components/components.module';

import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

//Pages
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    ComponentsModule,
    TranslateModule.forChild()
  ],
  providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())]
})
export class EmployeeModule { }
