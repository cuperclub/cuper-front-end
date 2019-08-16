import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Employee } from '../../models';

interface StatusData {
  status: string;
  feedback: string;
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMyEmployees(){
    const url = `${this.apiURL}/api/partner/companies/employees`
    return this.httpClient.get<Employee[]>(url);
  }


  public updateStatusEmployee(employeeId: number, data: StatusData){
    const url = `${this.apiURL}/api/partner/companies/employees/${employeeId}/update_state`
    return this.httpClient.put<Employee>(url, data);
  }

  public sendRequestNewEmployee(employeeId: number){
    const url = `${this.apiURL}/api/partner/companies/employees`
    return this.httpClient.post<Employee>(url, {user_id: employeeId});
  }
}
