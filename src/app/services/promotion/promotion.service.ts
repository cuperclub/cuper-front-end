import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Promotion } from '../../models';
import { UserService} from '../user/user.service'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  public getMyPromotions(){
    const companyId = this.userService.getCompanyIdView();
    return this.httpClient.get<Promotion[]>(`${this.apiURL}/api/partner/companies/${companyId}/promotions`);
  }

  public getPromotion(rewardId: number){
    const companyId = this.userService.getCompanyIdView();
    return this.httpClient.get<Promotion>(`${this.apiURL}/api/partner/companies/${companyId}/promotions/${rewardId}`);
  }

  public createPromotion(promotion: Promotion, officeId: number){
    return this.httpClient.post<Promotion>(`${this.apiURL}/api/partner/offices/${officeId}/promotions`, promotion);
  }

  public updatePromotion(promotion: Promotion, officeId: number){
    return this.httpClient.put<Promotion>(`${this.apiURL}/api/partner/offices/${officeId}/promotions/${promotion.id}`, promotion);
  }
}
