import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { Country } from './Country';
import { CountryHash } from './CountryHash';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private baseUrl = 'http://localhost:8080/';
  
  constructor(private http: HttpClient) { }

  public getCustomersList(): Observable<Country[]> {
    console.log("inside service")
    return this.http.get<Country[]>(`${this.baseUrl}/` + 'getCustomers');
  }

  public getCountries(): Observable<CountryHash> {
    console.log("inside service")
    return this.http.get<CountryHash>(`${this.baseUrl}/` + 'getCountries');
  }
}
