import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Routes, RouterModule } from '@angular/router';

// Pages
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// Partner
import { MyCompanyComponent } from './company/my-company/my-company.component';
import { RewardsComponent } from './company/rewards/rewards.component';
import { TransactionsComponent } from './employee/transactions/transactions.component';
import { ProfileComponent } from './profile/profile.component';
import { RewardComponent } from './company/reward/reward.component';
import { CompanyRegisterComponent } from './company/company-register/company-register.component';
//Admin
import { AdministrationComponent } from './admin/administration/administration.component';
import { CompaniesComponent } from './admin/companies/companies.component';
import { CustomersComponent } from './admin/customers/customers.component';
// Customer
import { PromotionsComponent } from './customer/promotions/promotions.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MyCompanyComponent,
    RewardsComponent,
    DashboardComponent,
    TransactionsComponent,
    ProfileComponent,
    RewardComponent,
    CompanyRegisterComponent,
    AdministrationComponent,
    CompaniesComponent,
    CustomersComponent,
    PromotionsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(ROUTES)
  ],
  exports: [LoginComponent],
})
export class PagesModule { }
