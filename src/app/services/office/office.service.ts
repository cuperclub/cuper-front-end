import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Office } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  apiURL = environment.apiBase;

  constructor(private httpClient: HttpClient) { }

  public getOffices(){
    return this.httpClient.get<Office[]>(`${this.apiURL}/api/partner/offices`);
  }

  public createOffice(office: Office){
    return this.httpClient.post<Office>(`${this.apiURL}/api/partner/offices`, office);
  }

  public updateOffice(office: Office){
    return this.httpClient.put<Office>(`${this.apiURL}/api/partner/offices/${office.id}`, office);
  }
}
