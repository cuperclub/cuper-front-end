import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';

import { ComponentsModule } from '../../components/components.module';

import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

//Pages
import { PromotionsComponent } from './promotions/promotions.component';

@NgModule({
    imports: [
    CommonModule,
    CustomerRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
    PromotionsComponent
],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())]
})
export class CustomerModule { }
