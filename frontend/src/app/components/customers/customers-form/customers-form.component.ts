import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required])
  });

  submitted = false;

  id:any = '';

  customer$: Observable<Customer> | undefined;

  constructor(private fb: FormBuilder, private service: CustomersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id) {
      this.buscarCustomer(this.id);
    }
  }

  buscarCustomer(id:any){
    this.customer$ = this.service.loadByID(id)
    .pipe();
  }

  onSubmit(){
    this.submitted = true;
    if(this.form?.valid){

      if(this.id){
        var obj = this.form.value;

        this.service.update(obj, this.id).subscribe(
          success => this.router.navigateByUrl('/customers'),
          error => alert('Um erro aconteceu!')
        );

      }else{
        var obj = this.form.value;

        this.service.create(obj).subscribe(
          success => this.router.navigateByUrl('/customers'),
          error => alert('Um erro aconteceu!')
        );

      }
    }
  }

}
