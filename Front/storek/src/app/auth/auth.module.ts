import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { PrimeModule } from '../prime/prime.module';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    SharedModule,
    PrimeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
