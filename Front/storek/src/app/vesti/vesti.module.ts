import { NgModule } from '@angular/core';
import { VestiComponent } from './components/vesti/vesti.component';
import { SharedModule } from 'primeng/api';
import { PrimeModule } from '../prime/prime.module';
import { CommonModule } from '@angular/common';
import { VestiFormComponent } from './components/vesti-form/vesti-form.component';
import { VestiEditFormComponent } from './components/vesti-edit-form/vesti-edit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VestiComponent,
    VestiFormComponent,
    VestiEditFormComponent
  ],
  imports: [
    SharedModule,
    PrimeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VestiModule { }
