import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, empty, Observable, Subject } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers$: Observable<Customer[]> | undefined;
  error$ = new Subject<boolean>();

  constructor(private service: CustomersService, private router: Router) { }

  ngOnInit() {
    this.buscarCustomers();
  }

  buscarCustomers(){
    this.customers$ = this.service.list()
    .pipe(
      catchError(error => {
        this.error$.next(true);
        return empty();
      })
    );
  }

  editarCustomer(id: any){
    this.router.navigate(['customers/edit', id]);
  }

  detalhesCustomer(id: any){
    this.router.navigate(['customers', id]);
  }

  removerCustomer(customer: { id: any; }){
    this.service.delete(customer.id).subscribe(
      success => this.buscarCustomers(),
      error => alert('Deu erro!')
    );
  }
}
