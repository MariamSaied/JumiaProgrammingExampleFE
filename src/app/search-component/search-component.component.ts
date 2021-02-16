import { Component, OnInit } from '@angular/core';
import { CountryCode } from '../CountryCode';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';
import { CountryHash } from '../CountryHash';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  countries:CountryCode[] = [];
  states:boolean[] = [true,false];
  per_page_count:number[] = [1,2,3,4,5,6,7,8,9,10];
  CountrySelected:string;
  StateSelected:boolean;
  PerPageSelected:number;

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

  getCustomersByCriteria(){
    console.log(this.CountrySelected)
    console.log(this.StateSelected)
    console.log(this.PerPageSelected)
  }

  setState(state:any){
    console.log("state" + state)
    this.StateSelected = state;
  }

  setCountry(country:any){
    this.CountrySelected = country;
  }

  setPerPage(per_page:any){
    this.PerPageSelected = per_page;
  }

  onSubmit(event:any){
    console.log("event");
    console.log(event);
    // console.log(this.CountrySelected)
    // console.log(this.StateSelected)
    // console.log(this.PerPageSelected)
  }
}
