import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiBase;

  constructor(private httpClient: HttpClient) { }

  public saveDataOnLocalStorage(user: User){
    const currentUser = this.getDataOnLocalStorage(),
          updateUser = {...currentUser, ...user};
    localStorage.setItem('current_user', JSON.stringify(updateUser));
  }

  public getDataOnLocalStorage(){
    const currentUser = localStorage.getItem('current_user');
    return JSON.parse(currentUser);
  }

  public clearDataOnLocalStorage(){
    localStorage.removeItem('current_user');
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

  public setCompanyIdView(id){
    let currentUser = this.getDataOnLocalStorage();
    currentUser = {...currentUser, ...{current_company_id: id}};
    localStorage.setItem('current_user', JSON.stringify(currentUser));
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

  public changePassword(userId, emailToNotify, newPassword) {
    const params = {
      email: emailToNotify,
      password: newPassword
    };
    return this.httpClient.put(`${this.apiURL}/api/admin/users/${userId}/update_password`, params);
  }
}
