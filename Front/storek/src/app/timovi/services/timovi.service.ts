import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/auth/services/storage.service';
import { LigeService } from 'src/app/lige/services/lige.service';

@Injectable({
  providedIn: 'root'
})
export class TimoviService {
  private apiUrl: string = "tim"
  constructor(
    private http: HttpClient,
    private ligeservice: LigeService,
    private storageService: StorageService
  ) { }
}
