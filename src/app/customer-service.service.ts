import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { Country } from './Country';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private baseUrl = 'http://localhost:8080/getCustomers';
  
  constructor(private http: HttpClient) { }

  public getCustomersList(): Observable<Country[]> {
    console.log("inside service")
    return this.http.get<Country[]>(`${this.baseUrl}/`);
  }
}
