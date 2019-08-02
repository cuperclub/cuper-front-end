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

  public addPlan(plan){
    return this.httpClient.post<Plan[]>(`${this.apiURL}/api/admin/plans`, plan);
  }

  public updatePlan(plan){
    return this.httpClient.put<Plan[]>(`${this.apiURL}/api/admin/plans/${plan.id}`, plan);
  }

  public planForCard(plan){
    return {
      time: plan.days + " days",
      price: plan.price,
      promotion: plan.information,
      active: plan.active
    }
  }

  public plansForCard(plans){
    return plans.map((plan)=>{
      return this.planForCard(plan);
    });
  }

  public plansAvailablesForCard(plans){
    let filterPlans = []
    plans.forEach((plan)=>{
      if (plan.active) {
        filterPlans.push(this.planForCard(plan));
      }
    });
    return filterPlans;
  }
}
