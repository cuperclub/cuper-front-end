import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Employee } from '../../models';
import { UserService} from '../user/user.service'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  public getMyEmployees(){
    const companyId = this.userService.getCompanyIdView();
    const url = `${this.apiURL}/api/partner/companies/${companyId}/employees`
    return this.httpClient.get<Employee[]>(url);
  }
}
