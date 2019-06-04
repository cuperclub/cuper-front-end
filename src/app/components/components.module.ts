import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

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
import { RegisterComponent } from '../pages/shared/register/register.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
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
    SquareSelectComponent,
    RewardCardComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    FooterComponent,
    CardOfficeComponent,
    CardUserComponent,
    PlaceholderCardComponent,
    AvatarComponent,
    BillingCardComponent,
    CompanyCardComponent,
    RewardSmallCardComponent,
    TableCardComponent,
    CardCashierComponent,
    PreviewRewardComponent,
    CardCounterComponent,
    SquareSelectComponent,
    RewardCardComponent
  ]
})
export class ComponentsModule { }
