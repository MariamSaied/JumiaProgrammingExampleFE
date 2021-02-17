import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponentComponent } from './search-component/search-component.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    ListCustomersComponent,
    SearchComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
