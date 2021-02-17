import { Component, OnInit } from '@angular/core';
import { Country } from '../../Collections/Country';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  // countries: Country[];
  constructor(private customerService: CustomerServiceService,
    private router: Router) { }

  @Input()
  countries: Country[];

  @Input()
  page_count: number = 3;

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.customerService.getCustomersList().subscribe((countries:Country[]) =>{ this.countries = countries});
  }

  getFilteredCustomers(filteredCustomers:{page_count: number, countries: Country[]}){
    if(filteredCustomers){
      console.log("filtered customers countries count: ", filteredCustomers.countries.length)
      this.countries = filteredCustomers.countries;
      this.page_count = filteredCustomers.page_count;
    }
  }

  doRefreshCountries(filteredCountries:any) {
    console.log("got refreshed")
    this.countries = [];
    this.countries = filteredCountries;
  }

  requestPage(){
    
  }

}
