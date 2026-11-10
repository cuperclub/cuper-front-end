import { Routes } from '@angular/router';

import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CompanyRegisterComponent } from './pages/company-register/company-register.component';

import { AuthGuard } from './guards/auth/auth.guard';
import { IsntSignedInGuard } from './guards/routes/isnt-signed-in.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { PartnerGuard } from './guards/partner/partner.guard';
import { CashierGuard } from './guards/cashier/cashier.guard';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  { path: 'recover_password', component: RecoverPasswordComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  { path: 'reset_password', component: ResetPasswordComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'register_company', component: CompanyRegisterComponent, canActivate: [AuthGuard] },
      {
        path: 'company',
        canActivate: [PartnerGuard],
        loadChildren: () => import('./pages/company/company.routes').then(m => m.COMPANY_ROUTES)
      },
      {
        path: 'promotions',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/customer/customer.routes').then(m => m.CUSTOMER_ROUTES)
      },
      {
        path: 'transactions',
        canActivate: [CashierGuard],
        loadChildren: () => import('./pages/employee/employee.routes').then(m => m.EMPLOYEE_ROUTES)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];
