import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiURL = environment.apiBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCategories(){
    return this.httpClient.get<Category[]>(`${this.apiURL}/api/admin/categories`);
  }

  public updateCategories(category){
    return this.httpClient.put<Category[]>(`${this.apiURL}/api/admin/categories/${category.id}`, category);
  }

}
