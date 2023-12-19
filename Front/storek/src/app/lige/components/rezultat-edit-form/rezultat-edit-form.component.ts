import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RezultatRequest } from 'src/app/shared/models/rezultatRequest';

@Component({
  selector: 'app-rezultat-edit-form',
  templateUrl: './rezultat-edit-form.component.html',
  styleUrls: ['./rezultat-edit-form.component.scss']
})
export class RezultatEditFormComponent {
  rezultatRequest: RezultatRequest = {
    tim1naziv: "",
    tim2naziv: "",
    rez1: 0,
    rez2: 0
  }

  tim1nazivlabel = ""
  tim2nazivlabel = ""
  file: any;

  rezultatForm!: FormGroup

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public formBuilder: FormBuilder
  ){}

  ngOnInit(): void{
    if(this.config.data)
    {
      this.tim1nazivlabel = this.config.data.rezultat.tim1naziv;
      this.tim2nazivlabel = this.config.data.rezultat.tim2naziv;
      this.rezultatRequest.tim1naziv = this.config.data.rezultat.tim1naziv;
      this.rezultatRequest.tim2naziv = this.config.data.rezultat.tim2naziv;
    }
    this.initForm();
  }

  initForm(): void {
    this.rezultatForm = this.formBuilder.group({
      rez1: new FormControl(this.rezultatRequest.rez1, Validators.required),
      rez2: new FormControl(this.rezultatRequest.rez2, Validators.required)
    });
  }

  onSaveFormRezultat(): void {
    if (this.rezultatForm.valid) {
      const updatedVest: RezultatRequest = {
        ...this.rezultatForm.value,
        slika: this.file
      };
      this.ref.close(updatedVest);
    } else {
      this.rezultatForm.markAllAsTouched();
    }
  }

  onCancelRezultatForm(): void {
    this.ref.close();
  }

  getFile(event: any):void {
    this.file = event.currentFiles[0];
    console.log(this.file);
  }
}
