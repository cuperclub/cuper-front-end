import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Office } from '../../models';
import { UserService} from '../user/user.service'

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  public getOffices(){
    const companyId = this.userService.getCompanyIdView();
    return this.httpClient.get<Office[]>(`${this.apiURL}/api/partner/companies/${companyId}/offices`);
  }

  public createOffice(office: Office){
    const companyId = this.userService.getCompanyIdView();
    return this.httpClient.post<Office>(`${this.apiURL}/api/partner/companies/${companyId}/offices`, office);
  }

  public updateOffice(office: Office){
    const companyId = this.userService.getCompanyIdView();
    const url = `${this.apiURL}/api/partner/companies/${companyId}/offices/${office.id}`
    return this.httpClient.put<Office>(url, office);
  }
}
