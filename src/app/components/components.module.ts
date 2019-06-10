import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// components
import { FooterComponent } from './footer/footer.component';
import { CardOfficeComponent } from './card-office/card-office.component';
import { CardUserComponent } from './card-user/card-user.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BillingCardComponent } from './billing-card/billing-card.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { PlaceholderCardComponent } from './placeholder-card/placeholder-card.component';
import { RewardSmallCardComponent } from './reward-small-card/reward-small-card.component';
import { TableCardComponent } from './table-card/table-card.component';
import { CardCashierComponent } from './card-cashier/card-cashier.component';
import { PreviewRewardComponent } from './preview-reward/preview-reward.component';
import { CardCounterComponent } from './card-counter/card-counter.component';
import { SquareSelectComponent } from './square-select/square-select.component';
import { RewardCardComponent } from './reward-card/reward-card.component';
import { NewRewardCardComponent } from './new-reward-card/new-reward-card.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { UpdatePasswordFormComponent } from './update-password-form/update-password-form.component';
import { InputTransactionFormComponent } from './input-transaction-form/input-transaction-form.component';
import { OutputTransactionFormComponent } from './output-transaction-form/output-transaction-form.component';
import { OfficePreviewComponent } from './office-preview/office-preview.component';
import { CardPointsComponent } from './card-points/card-points.component';
import { CardRegisterCompanyComponent } from './card-register-company/card-register-company.component';
import { OfficeFormComponent } from './office-form/office-form.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

const components = [
  FooterComponent,
  CardOfficeComponent,
  CardUserComponent,
  AvatarComponent,
  BillingCardComponent,
  CompanyCardComponent,
  PlaceholderCardComponent,
  RewardSmallCardComponent,
  TableCardComponent,
  CardCashierComponent,
  PreviewRewardComponent,
  CardCounterComponent,
  RewardCardComponent,
  OfficeFormComponent,
  CompanyFormComponent,
  ProfileFormComponent,
  UpdatePasswordFormComponent,
  InputTransactionFormComponent,
  OutputTransactionFormComponent,
  NewRewardCardComponent,
  SquareSelectComponent,
  OfficePreviewComponent,
  ControlMessagesComponent,
  CardPointsComponent,
  CardRegisterCompanyComponent
];

@NgModule({
  declarations: components,
  entryComponents: [
    OfficeFormComponent,
    CompanyFormComponent,
    ProfileFormComponent,
    UpdatePasswordFormComponent,
    InputTransactionFormComponent,
    OutputTransactionFormComponent,
    OfficePreviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: components
})
export class ComponentsModule { }
