import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Company } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMyCompany(){
    return this.httpClient.get<Company>(`${this.apiURL}/api/partner/companies`);
  }

  public updateMyCompany(companyInput: FormData): Observable<Company>{
    return this.httpClient.put<Company>(`${this.apiURL}/api/partner/companies`, companyInput);
  }

  public registerMyCompany(company: Company): Observable<Company>{
    return this.httpClient.post<Company>(`${this.apiURL}/api/partner/companies`, company);
  }
}
