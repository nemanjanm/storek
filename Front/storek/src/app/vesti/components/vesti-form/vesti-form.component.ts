import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-vesti-form',
  templateUrl: './vesti-form.component.html',
  styleUrls: ['./vesti-form.component.scss'],
  providers: [DialogService, MessageService]
})
export class VestiFormComponent {

  text: string = this.config.data.sadrzaj;
  datum: Date = this.config.data.datumKreiranja;
  izmena!: Date;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ){}

  ngOnInit(): void{
    if(this.config.data)
    {
      this.text = this.config.data.vest.sadrzaj;
      if(this.config.data.vest.izmenjeno)
        this.izmena = this.config.data.vest.datumIzmene;
      else
        this.datum = this.config.data.vest.datumKreiranja;
    }
  }
}
