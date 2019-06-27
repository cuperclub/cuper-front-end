import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Office } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getOffices(){
    return this.httpClient.get<Office[]>(`${this.apiURL}/api/partner/companies/offices`);
  }

  public createOffice(office: Office){
    return this.httpClient.post<Office>(`${this.apiURL}/api/partner/companies/offices`, office);
  }

  public updateOffice(office: Office){
    const url = `${this.apiURL}/api/partner/companies/offices/${office.id}`
    return this.httpClient.put<Office>(url, office);
  }
}
