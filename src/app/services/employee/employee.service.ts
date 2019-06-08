import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Employee } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiURL = environment.apiBase;

  constructor(private httpClient: HttpClient) { }

  public getMyEmployees(){
    return this.httpClient.get<Employee[]>(`${this.apiURL}/api/partner/employees`);
  }
}
