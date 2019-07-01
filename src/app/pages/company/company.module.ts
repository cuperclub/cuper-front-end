import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { MaterialModule } from '../../material.module';
import { ComponentsModule } from '../../components/components.module';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Pages
import { MyCompanyComponent } from './my-company/my-company.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { RewardsComponent } from './rewards/rewards.component';
import { RewardComponent } from './reward/reward.component';
import { CompanyComponent } from './company/company.component';

@NgModule({
  declarations: [
    MyCompanyComponent,
    CompanyRegisterComponent,
    RewardsComponent,
    RewardComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ]
})
export class CompanyModule { }
