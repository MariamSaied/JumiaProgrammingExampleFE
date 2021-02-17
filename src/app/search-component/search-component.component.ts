import { Component, OnInit, Output } from '@angular/core';
import { CountryCode } from '../../Collections/CountryCode';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';
import { CountryHash } from '../../Collections/CountryHash';
import { ObjectInterface } from '../../Collections/ObjectInterface';
import { Country } from 'src/Collections/Country';
import { EventEmitter } from '@angular/core';
import { SearchResponse } from 'src/Collections/SearchResponse';
import { Customer } from 'src/Collections/Customer';
@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})

export class SearchComponentComponent implements OnInit {

  countries:CountryCode[] = [];
  per_page_count:number[] = [1,2,3,4,5,6,7,8,9,10];
  CountrySelected:string;
  StateSelected:boolean;
  PerPageSelected:number;
  filteredCountry: Country[] = [];
  searchResponse: SearchResponse;
  page_count: number = 0;

  @Output('filteredCustomers') filteredCustomers = new EventEmitter<{page_count: number, countries: Country[]}>();
  
  constructor(private customerService: CustomerServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadCountries()
  }

  reloadCountries() {
    this.customerService.getCountries().subscribe((data:CountryHash) =>{
      Object.keys(data).forEach(key => {
        console.log(key);
        console.log(data[key])
          this.countries.push({country_name:data[key],code:key})
      });
      });
  }

  notifyParentComponent(){
    console.log("done modify")
    console.log(this.filteredCountry)
    this.filteredCustomers.emit({page_count: this.page_count, countries: this.filteredCountry});
  }
  getCustomersByCriteria(){
    let filter:ObjectInterface = {};
    this.filteredCountry = [];
    if(this.PerPageSelected) filter.per_page = this.PerPageSelected;
    if(this.CountrySelected){
      filter.country = this.CountrySelected;
      filter.search_type = {search_type:"BY_COUNTRY"}
    }
    if(this.StateSelected){
      filter.state = this.StateSelected;
      if(!this.CountrySelected){
        filter.search_type = {search_type:"BY_STATE"}
      }else{
        filter.search_type = {search_type:"BY_COUNTRY_STATE"}
      }
    }
    filter.page_number = 1;
    
    this.customerService.filter(filter).subscribe( searchResponseObs =>{
      console.log(searchResponseObs);
      this.page_count = searchResponseObs.page_count;
      searchResponseObs.page_customers.forEach(customer => {
        if(this.filteredCountry.length == 0){
          this.filteredCountry.push({country_name:customer.country_name,customers:[customer]});
          console.log("here")
          console.log({country_name:customer.country_name,customers:[customer]})
        }else{
          let countryPresent = this.filteredCountry.filter(country => country.country_name == customer.country_name);
          console.log(countryPresent)
          if(countryPresent.length == 0){
            this.filteredCountry.push({country_name:customer.country_name,customers:[customer]})
            console.log("down_here")
            console.log({country_name:customer.country_name,customers:[customer]})
          }else{
            this.filteredCountry.find(country => country.country_name == customer.country_name)?.customers.push(customer);
            // countryPresent[0].customers.push(customer);
            // console.log(countryPresent[0].customers)
          }
        }
      });
      console.log("filtered")
      console.log(this.filteredCountry)
      this.notifyParentComponent();
    });
    
  }

  setState(state:any){
    console.log("state: " + state)
    this.StateSelected = state;
  }

  setCountry(country:any){
    this.CountrySelected = country;
  }

  setPerPage(per_page:any){
    this.PerPageSelected = per_page;
  }

  onSubmit(){
    console.log(this.CountrySelected)
    this.getCustomersByCriteria();
  }
}
