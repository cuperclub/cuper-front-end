import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { Routes, RouterModule } from '@angular/router';

// Partner
import { MyCompanyComponent } from './company/my-company/my-company.component';
import { RewardsComponent } from './company/rewards/rewards.component';
import { RewardComponent } from './company/reward/reward.component';
import { CompanyRegisterComponent } from './company/company-register/company-register.component';
// Customer
import { PromotionsComponent } from './customer/promotions/promotions.component';

export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    MyCompanyComponent,
    RewardsComponent,
    RewardComponent,
    CompanyRegisterComponent,
    PromotionsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
})
export class PagesModule { }
