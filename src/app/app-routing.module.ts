import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/shared';
import { HomeComponent } from './pages/shared';
import { UserHomeComponent } from './pages/user/home/home.component';
import { EmployeeHomeComponent } from './pages/employee/home/home.component';
import { CompanyHomeComponent } from './pages/company/home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'user/dashboard', component: UserHomeComponent},
  { path: 'employee/dashboard', component: EmployeeHomeComponent},
  { path: 'company/dashboard', component: CompanyHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
