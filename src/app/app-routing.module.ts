import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/shared';
import { RegisterComponent } from './pages/shared';
import { HomeComponent } from './pages/shared';
import { UserHomeComponent } from './pages/user';
import { EmployeeHomeComponent } from './pages/employee';
// import { CompanyHomeComponent } from './pages/company';
import { MyCompanyComponent } from './pages/company';
import { NewRewardCardComponent } from './components/new-reward-card/new-reward-card.component';
import { RewardsComponent } from './pages/company';
import { AuthGuard } from './guards/auth/auth.guard';
import { IsntSignedInGuard } from './guards/routes/isnt-signed-in.guard';
import { IsPartnerGuard } from './guards/partner/is-partner.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [IsntSignedInGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: UserHomeComponent },
      { path: 'employee', component: EmployeeHomeComponent },
      { path: 'company', component: MyCompanyComponent, canActivate: [IsPartnerGuard] },
      { path: 'rewards', component: RewardsComponent, canActivate: [IsPartnerGuard] },
      { path: 'rewards/new', component: NewRewardCardComponent },
      // { path: 'dashboard', component: CompanyHomeComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
