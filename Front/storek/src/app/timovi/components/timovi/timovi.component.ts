import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { StorageService } from 'src/app/auth/services/storage.service';
import { TimEditFormComponent } from 'src/app/lige/components/tim-edit-form/tim-edit-form.component';
import { LigeService } from 'src/app/lige/services/lige.service';
import { RezultatiService } from 'src/app/lige/services/rezultati.service';
import { Tim } from 'src/app/shared/models/tim';
import { TimRequest } from 'src/app/shared/models/timRequest';

@Component({
  selector: 'app-timovi',
  templateUrl: './timovi.component.html',
  styleUrls: ['./timovi.component.scss']
})
export class TimoviComponent {

  res: any[] = [];
  admin: boolean = false;
  vise: boolean = false;
  liga!: number;

  constructor(
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private storageService: StorageService,
    private ligeService: LigeService,
    private route: ActivatedRoute, 
    private rezultatService: RezultatiService
  ){}
  ngOnInit(): void{
    if(this.storageService.getToken())
      this.admin = true;
    this.route.queryParams.subscribe(queryParam =>{
      this.liga = queryParam['liga'];
    this.ligeService.getTimInfo(this.liga).subscribe({
      next: (response: any)=>{
        if(response && response.status){
          this.res = response.object;
        }
        else
        {
          this.res = [];
        }
        }
      })
    })
  }

  izmeni(tim: Tim): void{
    const ref = this.dialogService.open(TimEditFormComponent, {
      header: "Izmeni tim",
      width: "1000px",
      data: {tim: tim}
    })

    ref.onClose.subscribe((updatedTim: TimRequest) => {
      if(updatedTim){
        updatedTim._id = tim.idekipe;
        this.ligeService.updateTim(updatedTim).subscribe({
          next: (res: any) => {
            if(res && res.status){
              this.messageService.add({
                severity: "success",
                summary: "Uspesno",
                detail: "Uspesno izmenjen tim"
              });
            }else {
              this.messageService.add({
                severity: "error",
                summary: "Greska",
                detail: "Vest nije izmenjena"
              })
            }
            this.ngOnInit();
          }
        })
      }
    })
  }
  obrisi(tim: Tim): void{
    this.confirmationService.confirm({
      header: "Brisanje tima",
      message: "Sigurni ste da želite da obrišete tim?",
      dismissableMask: true,
      accept: () => {
        this.ligeService.obrisiTim(tim.idekipe).subscribe({
          next: (res: any) => {
            if(res && res.status){
              this.messageService.add({
                severity: "success",
                summary: "Uspesno",
                detail: "Uspesno obrisan tim"
              });
              setTimeout(() => this.ngOnInit(), 3000);
            }else {
              this.messageService.add({
                severity: "error",
                summary: "Greska",
                detail: "Tim nije izbrisan"
              })
            }
          }
        })
      }
    })
  }
  dodajTim(): void{
    const ref = this.dialogService.open(TimEditFormComponent, {
      header: "Dodaj tim",
      width: "1000px"
    })
    ref.onClose.subscribe((addedTim: TimRequest)=> {
      if(addedTim){
        addedTim.liga = this.liga;
        this.ligeService.addTim(addedTim).subscribe({
          next: (res: any) => {
            if(res && res.status){
              this.messageService.add({
                severity: "success",
                summary: "Uspesno",
                detail: "Uspesno dodat tim"
              });
            }else{
              this.messageService.add({
                severity: "error",
                summary: "Greska",
                detail: "Vest nije izmenjena"
              })
            }
            this.ngOnInit();
          }
        })
      }
    })
  }
  
}
