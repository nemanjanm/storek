import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TimRequest } from 'src/app/shared/models/timRequest';

@Component({
  selector: 'app-tim-edit-form',
  templateUrl: './tim-edit-form.component.html',
  styleUrls: ['./tim-edit-form.component.scss']
})
export class TimEditFormComponent {
  timRequest: TimRequest = {
    naziv: "",
    kapiten: "",
    kontakt: ""
  }

  timForm!: FormGroup

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public formBuilder: FormBuilder
  ){}

  ngOnInit(): void{
    if(this.config.data)
    {
      this.timRequest.naziv = this.config.data.tim.nazivEkipe;
      this.timRequest.kapiten = this.config.data.tim.kapiten;
      this.timRequest.kontakt = this.config.data.tim.kontakt;
    }
    this.initForm();
  }

  initForm(): void {
    this.timForm = this.formBuilder.group({
      naziv: new FormControl(this.timRequest.naziv, Validators.required),
      kapiten: new FormControl(this.timRequest.kapiten, Validators.required),
      kontakt: new FormControl(this.timRequest.kontakt, Validators.required),
    });
  }

  onSaveFormTim(): void {
    if (this.timForm.valid) {
      const updatedVest: TimRequest = {
        ...this.timForm.value
      };
      this.ref.close(updatedVest);
    } else {
      this.timForm.markAllAsTouched();
    }
  }

  onCancelTimForm(): void {
    this.ref.close();
  }
}
