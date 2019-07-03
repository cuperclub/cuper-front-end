import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Company } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCompanyService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCompanies(){
    const url = `${this.apiURL}/api/admin/companies`
    return this.httpClient.get<Company[]>(url);
  }


  public changeStatusCompany(company: Company, status): Observable<Company>{
    const url = `${this.apiURL}/api/admin/companies/${company.id}/change_status`
    return this.httpClient.put<Company>(url, {status: status});
  }
}
