import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { StorageService } from '../auth/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: MenuItem[] = [];
  subscriptions: Subscription[] = [];

  admin: boolean = false;

  constructor(
    private storageService: StorageService,
    private router: Router
  ){}
  ngOnInit(): void{
    if(this.storageService.getToken())
      this.admin = true;
    this.setHeadersLinks();
  }
  
  private setHeadersLinks(): void{
    this.items = [
      {
        label: "Pocetna",
        routerLink: "/pocetna"
      },
      {
        label: "Lige",
        items: [
          {
            label: "Prva Liga",
            routerLink: "/lige",
            url: "/lige",
            queryParams: {liga: 1}
          },
          {
            label: "Druga Liga",
            url: "/lige",
            routerLink: "/lige",
            queryParams: {liga: 2}
          },
          {
            label: "Treca Liga",
            routerLink: "/lige",
            url: "/lige",
            queryParams: {liga: 3}
          }
        ]
      },
      {
        label: "Rang Liste",
        items: [
          {
            label: "Prva Liga",
            routerLink: "/",
            url: "/lige",
            queryParams: {liga: 1}
          },
          {
            label: "Druga Liga",
            routerLink: "/",
            url: "/lige",
            queryParams: {liga: 2}
          },
          {
            label: "Treca Liga",
            routerLink: "/",
            url: "/lige",
            queryParams: {liga: 2}
          }
        ]
      },
      {
        label: "Timovi",
        items: [
          {
            label: "Prva Liga",
            routerLink: "/timovi",
            url: "/lige",
            queryParams: {liga: 1}
          },
          {
            label: "Druga Liga",
            routerLink: "/timovi",
            url: "/lige",
            queryParams: {liga: 2}
          },
          {
            label: "Treca Liga",
            routerLink: "/timovi",
            url: "/lige",
            queryParams: {liga: 3}
          }
        ]
      },
      {
        label: "Pravilnik",
        routerLink: "/"
      },
      {
        label: "Admin",
        routerLink: "/login"
      },
      {
        label: "Logout",
        routerLink: "/logout",
        visible: this.admin
      }
    ]
  }
}

