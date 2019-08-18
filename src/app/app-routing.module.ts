import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Pages
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

//Guards
import { AuthGuard } from './guards/auth/auth.guard';
import { IsntSignedInGuard } from './guards/routes/isnt-signed-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  { path: 'recover_password', component: RecoverPasswordComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      {
        path: 'company',
        loadChildren: './pages/company/company.module#CompanyModule'
      },
      {
        path: 'promotions',
        loadChildren: './pages/customer/customer.module#CustomerModule'
      },
      {
        path: 'transactions',
        loadChildren: './pages/employee/employee.module#EmployeeModule'
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
