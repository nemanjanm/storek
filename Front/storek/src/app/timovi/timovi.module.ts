import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimoviComponent } from './components/timovi/timovi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { PrimeModule } from '../prime/prime.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    TimoviComponent
  ],
  imports: [
    SharedModule,
    PrimeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ]
})
export class TimoviModule { }
