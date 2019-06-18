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
    let date = joinNumber ? joinNumber.toString() : new Date().valueOf().toString();
    const lastNumber = date.substr(date.length - 1);
    const routeBase = '../../../../assets/images/avatars/';
    const path = routeBase + `${lastNumber}.png`;
    return path;
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

  public getCurrentCompany(){
    let currentUser = this.getDataOnLocalStorage();
    const currentCompany =  currentUser.companies.find(company => company.id == currentUser.current_company_id);
    return currentCompany;
  }

  public getMockData() {
    const users = [
      {
        image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3144848/3333/2500/m1/fpnw/wm0/jon-snow-01-.jpg?1503324019&s=361666065e9c69eb2e5c669e40b2a8b4',
        name: 'Jhon snow',
        email: 'jhon@example.com',
        national_id: "12345678",
        points: 30
      },
      {
        image: 'https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2017%2F05%2Fgame-of-thrones-season-5-nights-king-hbo-600x337.jpg&w=736&h=485&c=sc',
        name: 'King of night',
        email: 'night_king@example.com',
        national_id: "12345678",
        points: 30
      },
      {
        image: 'https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2017%2F05%2Fgame-of-thrones-season-5-nights-king-hbo-600x337.jpg&w=736&h=485&c=sc',
        name: 'Aria Stark',
        email: 'aria@example.com',
        national_id: "12345678",
        points: 30
      },
      {
        image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3144848/3333/2500/m1/fpnw/wm0/jon-snow-01-.jpg?1503324019&s=361666065e9c69eb2e5c669e40b2a8b4',
        name: 'John nieve',
        email: 'jhon_nieve@example.com',
        national_id: "12345678",
        points: 30
      }
    ];
    return users;
  }
}
