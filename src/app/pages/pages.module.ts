import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Routes, RouterModule } from '@angular/router';

// Pages
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { HomeComponent } from './shared/home/home.component';
import { UserHomeComponent } from './user/home/home.component';
import { EmployeeHomeComponent } from './employee/home/home.component';
// Partner
import { CompanyHomeComponent } from './company/home/home.component';
import { MyCompanyComponent } from './company/my-company/my-company.component';
import { RewardsComponent } from './company/rewards/rewards.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserHomeComponent,
    EmployeeHomeComponent,
    CompanyHomeComponent,
    MyCompanyComponent,
    RewardsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
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
