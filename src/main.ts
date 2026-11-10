import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

import { createTranslateLoader } from './app/translate-loader';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withXhr, withInterceptorsFromDi, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './app/services/auth/auth.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserAnimationsModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })),
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
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideRouter(APP_ROUTES),
        provideZoneChangeDetection()
    ]
})
  .catch(err => console.error(err));
