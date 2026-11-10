import { enableProdMode, importProvidersFrom } from '@angular/core';

import { createTranslateLoader } from './app/translate-loader';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withXhr, withInterceptorsFromDi, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './app/services/auth/auth.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AdminModule } from './app/pages/admin/admin.module';
import { ComponentsModule } from './app/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, AdminModule, ComponentsModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }), InfiniteScrollModule),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                disableClose: true,
                hasBackdrop: true
            }
        },
        provideHttpClient(withXhr(), withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
