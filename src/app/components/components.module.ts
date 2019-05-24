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
import { CardPlaceholderComponent } from './card-placeholder/card-placeholder.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BillingCardComponent } from './billing-card/billing-card.component';
import { CompanyCardComponent } from './company-card/company-card.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    FooterComponent,
    CardOfficeComponent,
    CardUserComponent,
    CardPlaceholderComponent,
    AvatarComponent,
    BillingCardComponent,
    CompanyCardComponent
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
    CardPlaceholderComponent,
    AvatarComponent,
    BillingCardComponent,
    CompanyCardComponent
  ]
})
export class ComponentsModule { }
