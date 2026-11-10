import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';

import { ComponentsModule } from '../../components/components.module';

import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

//Pages
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
    imports: [
    CommonModule,
    EmployeeRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
    TransactionsComponent
],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())]
})
export class EmployeeModule { }
