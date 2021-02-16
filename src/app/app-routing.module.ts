import { NgModule } from '@angular/core';
import { ListCustomersComponent } from './list-customers/list-customers.component';  
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [  
  { path: 'getCustomers', component: ListCustomersComponent, pathMatch: 'full' },  
  //{ path: '/', component: AddEmpComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
