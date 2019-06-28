import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyCompanyComponent } from './pages/company';
import { NewRewardCardComponent } from './components/new-reward-card/new-reward-card.component';
import { RewardsComponent } from './pages/company';
import { RewardComponent } from './pages/company';
import { CompanyRegisterComponent } from './pages/company';
import { PromotionsComponent } from './pages/customer';
import { AuthGuard } from './guards/auth/auth.guard';
import { IsntSignedInGuard } from './guards/routes/isnt-signed-in.guard';
import { IsPartnerGuard } from './guards/partner/is-partner.guard';

import { TransactionsComponent } from './pages/employee/transactions/transactions.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'company', component: MyCompanyComponent, canActivate: [IsPartnerGuard] },
      { path: 'company/register', component: CompanyRegisterComponent},
      { path: 'rewards', component: RewardsComponent, canActivate: [IsPartnerGuard] },
      { path: 'rewards/new', component: NewRewardCardComponent, canActivate: [IsPartnerGuard] },
      { path: 'rewards/edit/:rewardId', component: NewRewardCardComponent, canActivate: [IsPartnerGuard] },
      { path: 'rewards/details/:rewardId', component: RewardComponent, canActivate: [IsPartnerGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'promotions', component: PromotionsComponent },
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
