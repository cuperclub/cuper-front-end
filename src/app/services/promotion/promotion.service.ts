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

  public createPromotion(promotion: FormData, officeId: number){
    const companyId = this.userService.getCompanyIdView();
    const url = `${this.apiURL}/api/partner/companies/${companyId}/offices/${officeId}/promotions`
    return this.httpClient.post<Promotion>(url, promotion);
  }

  public updatePromotion(promotion: FormData, promotionId: number, officeId: number){
    const companyId = this.userService.getCompanyIdView();
    const url = `${this.apiURL}/api/partner/companies/${companyId}/offices/${officeId}/promotions/${promotionId}`
    return this.httpClient.put<Promotion>(url, promotion);
  }
}
