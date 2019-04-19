import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Pages
import { LoginComponent } from './shared/login/login.component';
import { UserHomeComponent } from './user/home/home.component';
import { EmployeeHomeComponent } from './employee/home/home.component';
import { CompanyHomeComponent } from './company/home/home.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LoginComponent,
    UserHomeComponent,
    EmployeeHomeComponent,
    CompanyHomeComponent
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
    })
  ],
  exports: [LoginComponent],
})
export class PagesModule { }
