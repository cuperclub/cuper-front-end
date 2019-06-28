import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { MaterialModule } from '../../material.module';
import { ComponentsModule } from '../../components/components.module';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { PromotionsComponent } from './promotions/promotions.component';

@NgModule({
  declarations: [
    PromotionsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    ComponentsModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ]
})
export class CustomerModule { }
