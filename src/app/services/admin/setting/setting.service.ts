import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminSettingService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getSettings(){
    const url = `${this.apiURL}/api/admin/app_settings/settings`
    return this.httpClient.get(url);
  }
}
