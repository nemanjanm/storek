import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { VestRequest } from 'src/app/shared/models/vestRequest';

@Component({
  selector: 'app-vesti-edit-form',
  templateUrl: './vesti-edit-form.component.html',
  styleUrls: ['./vesti-edit-form.component.scss'],
  providers: [DialogService, MessageService]
})
export class VestiEditFormComponent {
  vestRequest: VestRequest = {
    sadrzaj: "",
    naslov: "",
  }

  vestiForm!: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public formBuilder: FormBuilder
  ){}

  ngOnInit(): void{
    if(this.config.data)
    {
      this.vestRequest.sadrzaj = this.config.data.vest.sadrzaj;
      this.vestRequest.naslov = this.config.data.vest.naslov;
    }
    this.initForm();
  }

  initForm(): void {
    this.vestiForm = this.formBuilder.group({
      naslov: new FormControl(this.vestRequest.naslov, Validators.required),
      sadrzaj: new FormControl(this.vestRequest.sadrzaj, Validators.required),
    });
  }

  onSaveFormVesti(): void {
    if (this.vestiForm.valid) {
      const updatedVest: VestRequest = {
        ...this.vestiForm.value
      };
      this.ref.close(updatedVest);
    } else {
      this.vestiForm.markAllAsTouched();
    }
  }

  onCancelVestiForm(): void {
    this.ref.close();
  }

  get naslov() {
    return this.vestiForm.get('naslov');
  }

  get sadrzaj() {
    return this.vestiForm.get('sadrzaj');
  }
}
