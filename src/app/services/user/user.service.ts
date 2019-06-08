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

  public updateMyData(user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.apiURL}/api/users`, user);
  }

  public getAvatar(joinNumber){
    let date = joinNumber.toString();
    const lastNumber = date.substr(date.length - 1);
    const routeBase = '../../../../assets/images/avatars/';
    const path = routeBase + `${lastNumber}.png`;
    return path;
  }
}
