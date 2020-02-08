import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OutputTransaction } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class OutputTransactionService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public create(transaction: OutputTransaction) {
    return this.httpClient.post<OutputTransaction>(`${this.apiURL}/api/transaction_outputs`, transaction);
  }

  public getAll(page?, per_page?) {
    const paginationParams = {
      params: {
        page,
        per_page
      }
    };
    const params = (page && per_page) ? paginationParams : undefined;
    return this.httpClient.get<OutputTransaction[]>(`${this.apiURL}/api/transaction_outputs`, params);
  }
}
