import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCayegories(){
    const url = `${this.apiURL}/api/admin/categories`
    return this.httpClient.get<User[]>(url);
  }
}
