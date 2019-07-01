import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Promotion, OutputTransaction } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMyPromotions(){
    return this.httpClient.get<Promotion[]>(`${this.apiURL}/api/partner/companies/promotions`);
  }

  public getPromotion(rewardId: number){
    return this.httpClient.get<Promotion>(`${this.apiURL}/api/partner/companies/promotions/${rewardId}`);
  }

  public createPromotion(promotion: FormData, officeId: number){
    const url = `${this.apiURL}/api/partner/companies/offices/${officeId}/promotions`
    return this.httpClient.post<Promotion>(url, promotion);
  }

  public updatePromotion(promotion: FormData, promotionId: number, officeId: number){
    const url = `${this.apiURL}/api/partner/companies/offices/${officeId}/promotions/${promotionId}`
    return this.httpClient.put<Promotion>(url, promotion);
  }

  public getPublicPromotions() {
    return this.httpClient.get<Promotion[]>(`${this.apiURL}/api/promotions`);
  }

  public getOutputsTransaction(rewardId: number) {
    const url = `${this.apiURL}/api/partner/companies/promotions/${rewardId}/transaction_outputs`;
    return this.httpClient.get<OutputTransaction[]>(url);
  }
}
