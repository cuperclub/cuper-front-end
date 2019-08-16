import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrationComponent } from './administration/administration.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { PlansComponent } from './plans/plans.component';
import { SettingsComponent } from './settings/settings.component';

//Guards
import { AuthGuard } from '../../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'companies', component: CompaniesComponent},
      { path: 'customers', component: CustomersComponent },
      { path: 'categories', component: CategoriesComponent},
      { path: 'plans', component: PlansComponent},
      { path: 'settings', component: SettingsComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
