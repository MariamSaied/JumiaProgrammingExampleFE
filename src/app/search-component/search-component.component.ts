import { Component, OnInit, Output } from '@angular/core';
import { CountryCode } from '../../Collections/CountryCode';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';
import { CountryHash } from '../../Collections/CountryHash';
import { ObjectInterface } from '../../Collections/ObjectInterface';
import { Country } from 'src/Collections/Country';
import { EventEmitter } from '@angular/core';
import { SearchResponse } from 'src/Collections/SearchResponse';
import { Input, SimpleChanges } from '@angular/core';

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
  invalidPopUp:boolean = false;

  prevStateSelected:boolean;
  prevPerPageSelected:number;
  prevCountrySelected:string;

  @Input()
  page_number:number = 1;

  @Output('filteredCustomers') filteredCustomers = new EventEmitter<{page_count: number, countries: Country[],page_number_child:number}>();
  
  constructor(private customerService: CustomerServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadCountries()
  }

  reloadCountries() {
    this.customerService.getCountries().subscribe((data:CountryHash) =>{
      Object.keys(data).forEach(key => {
        this.countries.push({country_name:data[key],code:key})
      });
      });
  }

  notifyParentComponent(){
    this.filteredCustomers.emit({page_count: this.page_count, countries: this.filteredCountry,page_number_child:this.page_number});
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.page_number && changes.page_number){
      if (changes.page_number.currentValue != changes.page_number.previousValue )
      {
        this.page_number = changes.page_number.currentValue;
        this.getCustomersByCriteria(this.page_number);    
  
      }
    }
  }

  getCustomersByCriteria(page_number:number){
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
    if(page_number != 0) filter.page_number = page_number;
    else{
      this.page_number = 1;
      filter.page_number = 1;
    }
    
    this.customerService.filter(filter).subscribe( searchResponseObs =>{
      this.page_count = searchResponseObs.page_count;
      searchResponseObs.page_customers.forEach(customer => {
        if(this.filteredCountry.length == 0){
          this.filteredCountry.push({country_name:customer.country_name,customers:[customer]});
        }else{
          let countryPresent = this.filteredCountry.filter(country => country.country_name == customer.country_name);
          if(countryPresent.length == 0){
            this.filteredCountry.push({country_name:customer.country_name,customers:[customer]})
          }else{
            this.filteredCountry.find(country => country.country_name == customer.country_name)?.customers.push(customer);
          }
        }
      });
      this.notifyParentComponent();
    });
    
  }

  setState(state:any){
    this.StateSelected = state;
  }

  setCountry(country:any){
    this.CountrySelected = country;
  }

  setPerPage(per_page:any){
    this.PerPageSelected = per_page;
  }

  onSubmit(){
    if(!this.CountrySelected && !this.StateSelected){
      this.invalidPopUp = true;
    }
    else this.getCustomersByCriteria(0);
  }
}
