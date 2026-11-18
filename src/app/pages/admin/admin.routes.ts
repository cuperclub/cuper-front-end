import { Routes } from '@angular/router';

import { AdministrationComponent } from './administration/administration.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { PlansComponent } from './plans/plans.component';
import { SettingsComponent } from './settings/settings.component';
import { adminGuard } from '../../guards/admin/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'companies', component: CompaniesComponent, canActivate: [adminGuard] },
      { path: 'customers', component: CustomersComponent, canActivate: [adminGuard] },
      { path: 'categories', component: CategoriesComponent, canActivate: [adminGuard] },
      { path: 'plans', component: PlansComponent, canActivate: [adminGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [adminGuard] }
    ]
  }
];
