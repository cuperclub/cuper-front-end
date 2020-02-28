import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getAvatar(joinNumber){
    let date = joinNumber ? joinNumber.toString() : new Date().valueOf().toString();
    const lastNumber = date.substr(date.length - 1);
    const routeBase = '../../../../assets/images/avatars/';
    const path = routeBase + `${lastNumber}.png`;
    return path;
  }

  public formatErrorsAsObject(error: {}) {
    let errors = [];
    const keys = Object.keys(error);
    keys.forEach((key)=>{
      // let msg = `${key}: ${error[key].join(' ,')}`;
      let msg = error[key].join(' ,');
      errors.push(msg);
    });
    return errors;
  }
}
