import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, empty, Observable, Subject } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css']
})
export class CustomersDetailsComponent implements OnInit  {

  customer$: Observable<Customer> | undefined;
  error$ = new Subject<boolean>();

  constructor(private service: CustomersService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.buscarCustomer(id);
  }

  buscarCustomer(id:any){
    this.customer$ = this.service.loadByID(id)
    .pipe(
      catchError(error => {
        this.error$.next(true);
        return empty();
      })
    );
  }

}
