import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(
    private storageService: StorageService,
    private router: Router
  ){}
  ngOnInit(): void{
    this.storageService.deleteCredentials();
    this.router.navigate(["/pocetna"]);
  }
}
