import { Component, OnInit } from '@angular/core';
import { Country } from '../Country';
import {Observable} from 'rxjs/Rx';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';
import {Input } from '@angular/core';
import { Customer } from '../Customer';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input()
  countriesList: Country[];

  ngOnInit(): void {
    console.log(this.countriesList);
    console.log("here");
  }

}
