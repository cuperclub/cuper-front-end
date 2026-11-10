import { Routes } from '@angular/router';

import { AdministrationComponent } from './administration/administration.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { PlansComponent } from './plans/plans.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminGuard } from '../../guards/admin/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'companies', component: CompaniesComponent, canActivate: [AdminGuard] },
      { path: 'customers', component: CustomersComponent, canActivate: [AdminGuard] },
      { path: 'categories', component: CategoriesComponent, canActivate: [AdminGuard] },
      { path: 'plans', component: PlansComponent, canActivate: [AdminGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AdminGuard] }
    ]
  }
];
