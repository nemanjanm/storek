import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { StorageService } from 'src/app/auth/services/storage.service';
import { Tim } from 'src/app/shared/models/tim';
import { LigeService } from '../../services/lige.service';
import { ActivatedRoute } from '@angular/router';
import { RezultatiService } from '../../services/rezultati.service';
import { Rezultat } from 'src/app/shared/models/rezultat';
import { environment } from 'src/environment/environment';
import { TimEditFormComponent } from '../tim-edit-form/tim-edit-form.component';
import { TimRequest } from 'src/app/shared/models/timRequest';
import { RezultatEditFormComponent } from '../rezultat-edit-form/rezultat-edit-form.component';
import { RezultatRequest } from 'src/app/shared/models/rezultatRequest';

@Component({
  selector: 'app-lige',
  templateUrl: './lige.component.html',
  styleUrls: ['./lige.component.scss']
})
export class LigeComponent {
  
  timovi: Tim[] = [];

  rezultati: Rezultat[] = [];

  admin: boolean = false;

  liga!: number;

  kolo: number = 1;

  link: string = environment.serverUrl;

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
    this.link = environment.serverUrl;
    this.route.queryParams.subscribe(queryParam =>{
      this.liga = queryParam['liga'];
      this.ligeService.getAllTims(this.liga).subscribe({
        next: (response: any)=>{
          if(response && response.status){
            this.timovi = response.object;
            this.timovi.sort((a,b)=>(a.bodovi < b.bodovi) ? 1 : -1)
          }
          else
          {
            this.timovi = [];
          }
        }
      })
    })
    this.route.queryParams.subscribe(queryParam =>{
      this.liga = queryParam['liga'];
      this.rezultatService.getAllRezultate(this.liga).subscribe({
        next: (response: any)=>{
          if(response && response.status){
            this.rezultati = response.object;
          }
          else
          {
            this.rezultati = [];
          }
        }
      })
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
              this.ngOnInit();
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

  dodajRezultat(rezultat: Rezultat): void {
    const ref = this.dialogService.open(RezultatEditFormComponent, {
      header: "Dodaj rezultat",
      width: "1000px",
      data: {rezultat: rezultat}
    }
  )
  ref.onClose.subscribe((addedRezultat: RezultatRequest) => {
    if(addedRezultat){
      let formData: FormData = new FormData();
      formData.append("slika", addedRezultat.slika);
      formData.append("id1", rezultat.tim1);
      formData.append("id2", rezultat.tim2);
      formData.append("rez1", ""+addedRezultat.rez1);
      formData.append("rez2", ""+addedRezultat.rez2);
      this.ligeService.addRezultat(formData).subscribe({
        next: (res: any) => {
          if(res && res.status){
            this.messageService.add({
              severity: "success",
              summary: "Uspesno",
              detail: "Uspesno dodat rezultat"
            });
            this.ngOnInit();
          }else {
            this.messageService.add({
              severity: "error",
              summary: "Greska",
              detail: "Rezultat nije dodat"
            })
          }
        }
      })
    }
  })
}
  kreirajRaspored(): void{
    this.rezultatService.kreirajRaspored(this.liga).subscribe({
      next: (res: any) => {
        if(res && res.status){
          this.messageService.add({
            severity: "success",
            summary: "Uspesno",
            detail: "Uspesno kreiran raspored"
          });
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }else {
          this.messageService.add({
            severity: "error",
            summary: "Greska",
            detail: "Raspored nije kreiran"
          })
        }
      }
    })
  }
}
