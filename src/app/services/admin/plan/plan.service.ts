import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Plan } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class AdminPlanService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPlans(){
    const url = `${this.apiURL}/api/admin/plans`
    return this.httpClient.get<Plan[]>(url);
  }
}
