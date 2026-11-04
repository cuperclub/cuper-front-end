import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

const API_BASE = environment.apiBase;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.getAuthDataFromStorage();

    const authData = this.authService.currentAuthData;
    if (authData && this.isApiRequest(req.url)) {
      req = req.clone({
        setHeaders: {
          'access-token': authData.accessToken,
          'client': authData.client,
          'expiry': authData.expiry,
          'token-type': authData.tokenType,
          'uid': authData.uid
        }
      });
    }

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res),
      error => this.handleResponse(error)
    ));
  }

  private handleResponse(res): void {
    if (res instanceof HttpResponse || res instanceof HttpErrorResponse) {
      if (res.url && this.isApiRequest(res.url)) {
        this.authService.setAuthDataFromResponse(res.headers);
      }
    }
  }

  private isApiRequest(url: string): boolean {
    return !!url && url.indexOf(API_BASE) === 0;
  }
}
