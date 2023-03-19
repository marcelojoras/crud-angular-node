import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../components/customers/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly APICustomers = environment.APICustomers;

  constructor(private http: HttpClient) { }

  list(){ //pega todos os clientes
    return this.http.get<Customer[]>(this.APICustomers)
      .pipe();
  }

  loadByID(id: any){ //pega um cliente pelo id
    return this.http.get<Customer>(`${this.APICustomers}/${id}`)
      .pipe(
        take(1)
      );
  }

  create(customer: any){ //cria um cliente
    return this.http.post(`${this.APICustomers}/create`, customer)
      .pipe(
        take(1)
      );
  }

  update(customer: any, id: any){ //faz uma atualização no cliente
    return this.http.put(`${this.APICustomers}/edit/${id}`, customer)
      .pipe(
        take(1)
      );
  }

  delete(id: any){ //deleta um cliente
    return this.http.delete(`${this.APICustomers}/delete/${id}`)
      .pipe(
        take(1)
      );
  }
}
