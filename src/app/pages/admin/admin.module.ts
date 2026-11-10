import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

//Pages
import { AdministrationComponent } from './administration/administration.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { PlansComponent } from './plans/plans.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    AdminRoutingModule,
    TranslateModule.forChild(),
    AdministrationComponent,
    CompaniesComponent,
    CustomersComponent,
    CategoriesComponent,
    PlansComponent,
    SettingsComponent
],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())]
})
export class AdminModule { }
