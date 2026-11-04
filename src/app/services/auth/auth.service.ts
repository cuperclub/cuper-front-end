import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent, interval, Observable } from 'rxjs';
import { filter, finalize, pluck, share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface AuthData {
  accessToken: string;
  client: string;
  expiry: string;
  tokenType: string;
  uid: string;
}

/**
 * Preserves the angular-token storage contract and the Devise Token Auth
 * protocol used by Rails. Do not rename headers or storage keys without
 * coordinating a session-compatible migration.
 */
const API_BASE = environment.apiBase;
const SIGN_IN_PATH = 'auth/sign_in';
const SIGN_OUT_PATH = 'auth/sign_out';
const VALIDATE_TOKEN_PATH = 'auth/validate_token';
const ACCOUNT_PATH = 'auth';
const RESET_PASSWORD_PATH = 'auth/password';
const OAUTH_CALLBACK_PATH = 'oauth_callback';
const OAUTH_PATHS = {
  facebook: 'auth/facebook',
  google_oauth2: 'auth/google_oauth2'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authData: AuthData = null;
  private userData: any = null;

  constructor(private httpClient: HttpClient) {
    this.getAuthDataFromStorage();
  }

  get currentUserData() {
    return this.userData;
  }

  get currentAuthData() {
    return this.authData;
  }

  userSignedIn(): boolean {
    return !!this.authData;
  }

  signIn(signInData): Observable<any> {
    const body = {
      email: signInData.login,
      password: signInData.password
    };
    const observable = this.httpClient
      .post(`${API_BASE}/${SIGN_IN_PATH}`, body, { observe: 'response' })
      .pipe(share());

    observable.subscribe((res: any) => this.userData = res.body.data);
    return observable;
  }

  signInOAuth(oAuthType: string): Observable<any> {
    const oAuthPath = OAUTH_PATHS[oAuthType] || `auth/${oAuthType}`;
    const callbackUrl = `${window.location.origin}/${OAUTH_CALLBACK_PATH}`;
    const authUrl = `${API_BASE}/${oAuthPath}?omniauth_window_type=newWindow` +
      `&auth_origin_url=${encodeURIComponent(callbackUrl)}`;

    const popup = window.open(authUrl, '_blank', 'closebuttoncaption=Cancel');
    return this.requestCredentialsViaPostMessage(popup);
  }

  registerAccount(registerData): Observable<any> {
    const body = {
      email: registerData.login,
      password: registerData.password,
      password_confirmation: registerData.passwordConfirmation,
      name: registerData.name,
      confirm_success_url: this.currentLocation()
    };
    return this.httpClient.post(`${API_BASE}/${ACCOUNT_PATH}`, body);
  }

  signOut(): Observable<any> {
    return this.httpClient.delete(`${API_BASE}/${SIGN_OUT_PATH}`)
      .pipe(finalize(() => this.clearAuthData()));
  }

  validateToken(): Observable<any> {
    const observable = this.httpClient.get(`${API_BASE}/${VALIDATE_TOKEN_PATH}`).pipe(share());
    observable.subscribe(
      (res: any) => this.userData = res.data,
      () => null
    );
    return observable;
  }

  updatePassword(updatePasswordData): Observable<any> {
    const body = {
      current_password: updatePasswordData.passwordCurrent,
      password: updatePasswordData.password,
      password_confirmation: updatePasswordData.passwordConfirmation
    };
    return this.httpClient.put(`${API_BASE}/${ACCOUNT_PATH}`, body);
  }

  resetPassword(email: string): Observable<any> {
    const body = {
      email: email,
      redirect_url: this.currentLocation()
    };
    return this.httpClient.post(`${API_BASE}/${RESET_PASSWORD_PATH}`, body);
  }

  /**
   * Reads headers issued by Rails. Called by AuthInterceptor so any API
   * response can refresh the stored session, matching angular-token behavior.
   */
  setAuthDataFromResponse(headers): void {
    const authData: AuthData = {
      accessToken: headers.get('access-token'),
      client: headers.get('client'),
      expiry: headers.get('expiry'),
      tokenType: headers.get('token-type'),
      uid: headers.get('uid')
    };
    this.setAuthData(authData);
  }

  /**
   * Reloads credentials from storage before each request, matching
   * angular-token and keeping sessions from other tabs usable.
   */
  getAuthDataFromStorage(): void {
    const stored = {
      accessToken: this.storageGet('accessToken'),
      client: this.storageGet('client'),
      expiry: this.storageGet('expiry'),
      tokenType: this.storageGet('tokenType'),
      uid: this.storageGet('uid')
    };
    if (this.isComplete(stored) && this.isNotOlder(stored)) {
      this.authData = stored;
    }
  }

  private requestCredentialsViaPostMessage(authWindow: Window): Observable<any> {
    const pollerObserv = interval(500);
    const responseObserv = fromEvent(window, 'message').pipe(
      pluck('data'),
      filter(data => this.isOAuthResponse(data))
    );
    responseObserv.subscribe(data => this.setAuthDataFromPostMessage(data));
    const pollerSubscription = pollerObserv.subscribe(() => {
      if (!authWindow || authWindow.closed) {
        pollerSubscription.unsubscribe();
      } else {
        authWindow.postMessage('requestCredentials', '*');
      }
    });
    return responseObserv;
  }

  private isOAuthResponse(data): boolean {
    return !!data && (data.message === 'deliverCredentials' || data.message === 'authFailure');
  }

  private setAuthDataFromPostMessage(data): void {
    this.setAuthData({
      accessToken: data['auth_token'],
      client: data['client_id'],
      expiry: data['expiry'],
      tokenType: 'Bearer',
      uid: data['uid']
    });
  }

  private setAuthData(authData: AuthData): void {
    if (!this.isComplete(authData) || !this.isNotOlder(authData)) {
      return;
    }
    this.authData = authData;
    this.storageSet('accessToken', authData.accessToken);
    this.storageSet('client', authData.client);
    this.storageSet('expiry', authData.expiry);
    this.storageSet('tokenType', authData.tokenType);
    this.storageSet('uid', authData.uid);
  }

  private clearAuthData(): void {
    ['accessToken', 'client', 'expiry', 'tokenType', 'uid'].forEach(key => this.storageRemove(key));
    this.authData = null;
    this.userData = null;
  }

  private isComplete(authData: AuthData): boolean {
    return !!authData &&
      authData.accessToken != null &&
      authData.client != null &&
      authData.expiry != null &&
      authData.tokenType != null &&
      authData.uid != null;
  }

  private isNotOlder(authData: AuthData): boolean {
    return this.authData == null || authData.expiry >= this.authData.expiry;
  }

  private currentLocation(): string {
    return window.location.href;
  }

  private storageGet(key: string): string {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem(key);
  }

  private storageSet(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private storageRemove(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
