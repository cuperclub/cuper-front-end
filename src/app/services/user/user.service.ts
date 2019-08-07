import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AngularTokenService } from 'angular-token';
import { User } from '../../models';
import { Observable } from 'rxjs';

interface UserProfile extends User{
  current_company_id?: number;
  companies?: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient,
    private tokenService: AngularTokenService) { }

  public getDataOnLocalStorage() {
    const currentUser: UserProfile = this.tokenService.currentUserData;
    return currentUser;
  }

  public updateMyData(userInput: FormData): Observable<User>{
    return this.httpClient.put<User>(`${this.apiURL}/api/users`, userInput);
  }

  public searchUsers(query) {
    query= query || '';
    let params = {params: {query: query}};
    return this.httpClient.get<User[]>(`${this.apiURL}/api/users/search`, params);
  }

  public getCompanyIdView(){
    const currentUser = this.getDataOnLocalStorage();
    return currentUser.current_company_id;
  }

  public updateCompanyIdView(id){
    return this.httpClient.put(`${this.apiURL}/api/users/current_view`, {company_id: id});
  }

  public getCurrentCompany(){
    let currentUser = this.getDataOnLocalStorage();
    const currentCompany =  currentUser.companies.find(company => company.id == currentUser.current_company_id);
    return currentCompany;
  }

  public userIsCashier(){
    const currentCompany =  this.getCurrentCompany();
    const isCashier = currentCompany && (currentCompany.role === 'cashier' || currentCompany.role === 'partner');
    return isCashier;
  }

  public userIsPartner(){
    const currentCompany =  this.getCurrentCompany();
    const isPartner = currentCompany && (currentCompany.role === 'partner');
    return isPartner;
  }

  public isCustomer() {
    return !!this.getCurrentCompany();
  }

  public changePassword(userId, params) {
    return this.httpClient.put(`${this.apiURL}/api/admin/users/${userId}/update_password`, params);
  }
}
