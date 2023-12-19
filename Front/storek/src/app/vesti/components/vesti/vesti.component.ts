import { Component } from '@angular/core';
import { Vest } from 'src/app/shared/models/vest';
import { VestiService } from '../../services/vesti.service';
import { DialogService } from 'primeng/dynamicdialog';
import { VestiFormComponent } from '../vesti-form/vesti-form.component';
import { VestiEditFormComponent } from '../vesti-edit-form/vesti-edit-form.component';
import { VestRequest } from 'src/app/shared/models/vestRequest';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StorageService } from 'src/app/auth/services/storage.service';

@Component({
  selector: 'app-vesti',
  templateUrl: './vesti.component.html',
  styleUrls: ['./vesti.component.scss']
})
export class VestiComponent {

  vesti: Vest[] = [];
  
  admin: boolean = false;

  constructor(private vestiService: VestiService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private storageService: StorageService
    ){}

  ngOnInit(): void {
    if(this.storageService.getToken())
      this.admin = true;
    this.vestiService.getAllVesti().subscribe({
      next: (response: any) => {
        if(response){
          this.vesti = response;
        }
      }
    });
  }

  procitaj(celaVest: Vest): void{
    const ref = this.dialogService.open(VestiFormComponent, {
      header: celaVest.naslov,
      width: "1000px",
      data: {vest: celaVest}
    })
  }
  
  dodaj(): void{
    const ref = this.dialogService.open(VestiEditFormComponent, {
      header: "Dodaj Vest",
      width: "1000px"
    })
    ref.onClose.subscribe((updatedVest: VestRequest) => {
      if(updatedVest){
        this.vestiService.dodajeVest(updatedVest).subscribe({
          next: (res: any) => {
            if(res && res.status){
              this.messageService.add({
                severity: "success",
                summary: "Uspesno",
                detail: "Uspesno dodata vest"
              });
              this.ngOnInit();
            }else {
              this.messageService.add({
                severity: "error",
                summary: "Greska",
                detail: "Vest nije dodata"
              })
            }
          }
        })
      }
    })
  }

  izmeni(celaVest: Vest): void{
    const ref = this.dialogService.open(VestiEditFormComponent, {
      header: "Izmena Vesti",
      width: "1000px",
      data: {vest: celaVest}
    })

    ref.onClose.subscribe((updatedVest: VestRequest) => {
      if(updatedVest){
        updatedVest._id = celaVest._id;
        this.vestiService.updateVest(updatedVest).subscribe({
          next: (res: any) => {
            if(res && res.status){
              this.messageService.add({
                severity: "success",
                summary: "Uspesno",
                detail: "Uspesno izmenjena vest"
              });
              this.ngOnInit();
            }else {
              this.messageService.add({
                severity: "error",
                summary: "Greska",
                detail: "Vest nije izmenjena"
              })
            }
          }
        })
      }
    })
  }

  obrisi(celaVest: Vest){
    this.confirmationService.confirm({
      header: "Brisanje vesti",
      message: "Sigurni ste da želite da obrišete vest?",
      dismissableMask: true,
      accept: () => {
        this.vestiService.obrisiVest(celaVest._id).subscribe({
          next: (res: any) => {
            if(res && res.status){
              this.messageService.add({
                severity: "success",
                summary: "Uspesno",
                detail: "Uspesno obrisana vest"
              });
              this.ngOnInit();
            }else {
              this.messageService.add({
                severity: "error",
                summary: "Greska",
                detail: "Vest nije izmenjena"
              })
            }
          }
        })
      }
    })
  }
}
