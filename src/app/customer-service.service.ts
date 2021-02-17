import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { Country } from '../Collections/Country';
import { CountryHash } from '../Collections/CountryHash';
import { ObjectInterface } from '../Collections/ObjectInterface';
import { Customer } from '../Collections/Customer';
import { SearchResponse } from 'src/Collections/SearchResponse';

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

  public filter(filterObject:ObjectInterface): Observable<SearchResponse>{
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filterObject)
    };
    console.log(requestOptions.body)
    return this.http.post<SearchResponse>(`${this.baseUrl}/` + 'filterCustomers', requestOptions.body,{'headers':requestOptions.headers});
  }

}
