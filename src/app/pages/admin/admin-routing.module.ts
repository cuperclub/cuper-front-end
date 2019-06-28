import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrationComponent } from './administration/administration.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdministrationComponent,
    children: [
      { path: 'companies', component: CompaniesComponent},
      { path: 'customers', component: CustomersComponent },
      { path: 'categories', component: CustomersComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
