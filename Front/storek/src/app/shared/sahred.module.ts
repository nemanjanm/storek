import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '../prime/prime.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrimeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    ],
  exports: [
    CommonModule,
    HttpClientModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }