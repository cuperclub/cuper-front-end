import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/shared';
import { UserHomeComponent } from './pages/user/home/home.component';
import { EmployerHomeComponent } from './pages/employer/home/home.component';
import { CompanyHomeComponent } from './pages/company/home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'user/home', component: UserHomeComponent},
  { path: 'employer/home', component: EmployerHomeComponent},
  { path: 'company/home', component: CompanyHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
