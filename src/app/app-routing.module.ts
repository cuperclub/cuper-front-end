import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Pages
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CompanyRegisterComponent } from './pages/company-register/company-register.component';

//Guards
import { AuthGuard } from './guards/auth/auth.guard';
import { IsntSignedInGuard } from './guards/routes/isnt-signed-in.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { PartnerGuard } from './guards/partner/partner.guard';
import { CashierGuard } from './guards/cashier/cashier.guard';

const routes: Routes = [
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
        loadChildren: './pages/company/company.module#CompanyModule'
      },
      {
        path: 'promotions',
        canActivate: [AuthGuard],
        loadChildren: './pages/customer/customer.module#CustomerModule'
      },
      {
        path: 'transactions',
        canActivate: [CashierGuard],
        loadChildren: './pages/employee/employee.module#EmployeeModule'
      }
    ],
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: './pages/admin/admin.module#AdminModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
