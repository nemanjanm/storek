import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  setCredentials(info: any): void {
    localStorage.setItem("token", info);
  }

  deleteCredentials(): void{
    localStorage.removeItem("token");
  }
}
