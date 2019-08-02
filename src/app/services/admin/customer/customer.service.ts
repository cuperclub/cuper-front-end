import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class AdminCustomerService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCustomers(page, per_page, role){
    const url = `${this.apiURL}/api/admin/users`;
    const params = {
      params: {
        role: role,
        page,
        per_page
      }
    };
    return this.httpClient.get<User[]>(url, params);
  }
}
