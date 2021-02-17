import { Component, OnInit } from '@angular/core';
import { Country } from '../../Collections/Country';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';
import { Input} from '@angular/core';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
    
  page_number:number = 1;

  @Input()
  countries: Country[];

  @Input()
  page_count: number = 0;

  pages:number[];

  constructor(private customerService: CustomerServiceService,
  private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.customerService.getCustomersList().subscribe((countries:Country[]) =>{ this.countries = countries});
  }

  doRefreshCountries(filteredCustomers:{page_count: number, countries: Country[],page_number_child:number}) {
    this.countries = [];
    this.countries = filteredCustomers.countries;
    this.page_count = filteredCustomers.page_count;
    this.pages = Array.from(new Array(this.page_count), (x,i) => i+1);
    this.page_number = filteredCustomers.page_number_child;
  }

  getPreviousPage(){
    this.page_number = this.page_number - 1;
  }

  getNextPage(){
    this.page_number = this.page_number + 1;
  }

  getPage(index:number){
    this.page_number = index;
  }

}
