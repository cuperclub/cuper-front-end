import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { MaterialModule } from '../../material.module';
import { ComponentsModule } from '../../components/components.module';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

//Pages
import { PromotionsComponent } from './promotions/promotions.component';

@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    ComponentsModule,
    TranslateModule.forChild()
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class CustomerModule { }
