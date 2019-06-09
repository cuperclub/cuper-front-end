import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Promotion } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  apiURL = environment.apiBase;

  constructor(private httpClient: HttpClient) { }

  public getMyPromotions(){
    return this.httpClient.get<Promotion[]>(`${this.apiURL}/api/partner/company/promotions`);
  }

  public getPromotion(rewardId: number){
    return this.httpClient.get<Promotion>(`${this.apiURL}/api/partner/company/promotions/${rewardId}`);
  }
}
