import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrationComponent } from './administration/administration.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { PlansComponent } from './plans/plans.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdministrationComponent,
    children: [
      { path: 'companies', component: CompaniesComponent},
      { path: 'customers', component: CustomersComponent },
      { path: 'categories', component: CategoriesComponent},
      { path: 'plans', component: PlansComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
