import { Injectable } from '@angular/core';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public saveDataOnLocalStorage(user: User){
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  public getDataOnLocalStorage(){
    const currentUser = localStorage.getItem('current_user');
    return JSON.parse(currentUser);
  }

  public clearDataOnLocalStorage(){
    localStorage.removeItem('current_user');
  }
}
