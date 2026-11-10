import { Routes } from '@angular/router';

import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CompanyRegisterComponent } from './pages/company-register/company-register.component';

import { authGuard } from './guards/auth/auth.guard';
import { isntSignedInGuard } from './guards/routes/isnt-signed-in.guard';
import { adminGuard } from './guards/admin/admin.guard';
import { partnerGuard } from './guards/partner/partner.guard';
import { cashierGuard } from './guards/cashier/cashier.guard';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [isntSignedInGuard] },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [isntSignedInGuard] },
  { path: 'recover_password', component: RecoverPasswordComponent, pathMatch: 'full', canActivate: [isntSignedInGuard] },
  { path: 'reset_password', component: ResetPasswordComponent, pathMatch: 'full', canActivate: [isntSignedInGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
      { path: 'register_company', component: CompanyRegisterComponent, canActivate: [authGuard] },
      {
        path: 'company',
        canActivate: [partnerGuard],
        loadChildren: () => import('./pages/company/company.routes').then(m => m.COMPANY_ROUTES)
      },
      {
        path: 'promotions',
        canActivate: [authGuard],
        loadChildren: () => import('./pages/customer/customer.routes').then(m => m.CUSTOMER_ROUTES)
      },
      {
        path: 'transactions',
        canActivate: [cashierGuard],
        loadChildren: () => import('./pages/employee/employee.routes').then(m => m.EMPLOYEE_ROUTES)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];
