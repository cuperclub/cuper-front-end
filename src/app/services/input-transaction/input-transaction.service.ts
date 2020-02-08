import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { InputTransaction } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class InputTransactionService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public create(transaction: InputTransaction) {
    return this.httpClient.post<InputTransaction>(`${this.apiURL}/api/transaction_inputs`, transaction);
  }

  public getAll(page?, per_page?) {
    const paginationParams = {
      params: {
        page,
        per_page
      }
    };
    const params = (page && per_page) ? paginationParams : undefined;
    return this.httpClient.get<InputTransaction[]>(`${this.apiURL}/api/transaction_inputs`, params);
  }
}
