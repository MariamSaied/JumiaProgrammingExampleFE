import { Component, OnInit } from '@angular/core';
import { Country } from '../Country';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  countries: Country[];
  constructor(private customerService: CustomerServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
    //console.log("countries");
    //console.log(countries);
  }

  reloadData() {
    this.customerService.getCustomersList().subscribe((countries:Country[]) =>{ this.countries = countries});
  }

}
