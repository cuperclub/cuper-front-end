import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/shared';
import { HomeComponent } from './pages/shared';
import { UserHomeComponent } from './pages/user';
import { EmployeeHomeComponent } from './pages/employee';
import { CompanyHomeComponent } from './pages/company';
import { MyCompanyComponent } from './pages/company';
import { RewardsComponent } from './pages/company';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user', component: UserHomeComponent },
      { path: 'employee', component: EmployeeHomeComponent },
      { path: 'company', component: CompanyHomeComponent },
      { path: 'rewards', component: RewardsComponent },
      { path: 'my_company', component: MyCompanyComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
