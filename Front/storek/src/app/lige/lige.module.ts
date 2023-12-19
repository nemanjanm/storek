import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { PrimeModule } from '../prime/prime.module';
import { LigeComponent } from './components/lige/lige.component';
import { TimEditFormComponent } from './components/tim-edit-form/tim-edit-form.component';
import { RezultatEditFormComponent } from './components/rezultat-edit-form/rezultat-edit-form.component';



@NgModule({
  declarations: [
    LigeComponent,
    TimEditFormComponent,
    RezultatEditFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LigeModule { }
