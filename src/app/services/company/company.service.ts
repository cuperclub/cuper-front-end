import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Company } from '../../models';
import { UserService} from '../user/user.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  public getMyCompany(){
    const id = this.userService.getCompanyIdView();
    return this.httpClient.get<Company>(`${this.apiURL}/api/partner/companies/${id}`);
  }

  public updateMyCompany(company: Company): Observable<Company>{
    const id = this.userService.getCompanyIdView();
    return this.httpClient.put<Company>(`${this.apiURL}/api/partner/companies/${id}`, company);
  }

  public registerMyCompany(company: Company): Observable<Company>{
    return this.httpClient.post<Company>(`${this.apiURL}/api/partner/companies`, company);
  }
}
