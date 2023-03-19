import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { CustomersListComponent } from './components/customers/customers-list/customers-list.component';
import { CustomersFormComponent } from './components/customers/customers-form/customers-form.component';
import { CustomersDetailsComponent } from './components/customers/customers-details/customers-details.component';

const redirectToLogin = () => redirectUnauthorizedTo(['']);
const redirectToHome = () => redirectLoggedInTo(['customers']);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'customers',
    component: CustomersListComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'customers/create',
    component: CustomersFormComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'customers/edit/:id',
    component: CustomersFormComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'customers/:id',
    component: CustomersDetailsComponent,
    ...canActivate(redirectToLogin)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
