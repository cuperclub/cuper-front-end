import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AngularTokenService } from 'angular-token';
import { User, Notification } from '../../models';
import { Observable, Subscriber } from 'rxjs';

interface UserProfile extends User{
  current_company_id?: number;
  companies?: Array<any>;
}

export interface UserTokenData extends User {
  is_admin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiBase;
  observerData: Subscriber<any>;
  userDataEdited: UserProfile;

  constructor(
    private httpClient: HttpClient,
    private tokenService: AngularTokenService) { }

  public getCurrentUserData() {
    const currentUser: UserProfile = {...this.tokenService.currentUserData, ...this.userDataEdited};
    if(this.observerData) this.observerData.next(currentUser);
    return currentUser;
  }

  public getObservableUserData() {
    return new Observable(observer => this.observerData = observer);
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
    const currentUser = this.getCurrentUserData();
    return currentUser.current_company_id;
  }

  public updateCompanyIdView(id){
    return this.httpClient.put(`${this.apiURL}/api/users/current_view`, {company_id: id});
  }

  public getCurrentCompany(){
    let currentUser = this.getCurrentUserData();
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

  public userIsAdmin() {
    const currentUser: UserTokenData = this.getCurrentUserData();
    return currentUser.is_admin;
  }

  public validateToken() {
    let promise: Promise<any> = new Promise((resolve, reject) => {
      this.tokenService.validateToken().subscribe(
        (resp) =>  resolve(resp['data']),
        () =>  reject(false)
      )
    });
    return promise;
  }

  public isCustomer() {
    return !!this.getCurrentCompany();
  }

  public changePassword(userId, params) {
    return this.httpClient.put(`${this.apiURL}/api/admin/users/${userId}/update_password`, params);
  }

  public getNotifications() {
    return this.httpClient.get<User[]>(`${this.apiURL}/api/notifications`);
  }

  public answerNotifications(notificationId, params) {
    return this.httpClient.put<Notification[]>(`${this.apiURL}/api/notifications/${notificationId}/answer_request_employee`, params);
  }

  public readNotifications() {
    return this.httpClient.post(`${this.apiURL}/api/notifications/read_pending_notifications`, {});
  }

}
