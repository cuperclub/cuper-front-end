import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

//Pages
import { AdministrationComponent } from './administration/administration.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { PlansComponent } from './plans/plans.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    CompaniesComponent,
    CustomersComponent,
    CategoriesComponent,
    PlansComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    AdminRoutingModule,
    HttpClientModule,
    TranslateModule
  ]
})
export class AdminModule { }
