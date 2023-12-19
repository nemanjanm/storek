import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';
import { Rezultat } from 'src/app/shared/models/rezultat';
import { Tim } from 'src/app/shared/models/tim';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RezultatiService {

  private apiUrl: string = "rezultat"
  constructor(
    private http: HttpClient,
    private storageService: StorageService
    ) { }

  public getAllRezultate(liga: number): Observable<Rezultat[]>{
    return this.http.get<Rezultat[]>(`${environment.serverUrl}/${this.apiUrl}/${liga}`);
  }

  public kreirajRaspored(liga: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',  'Authorization': `Bearer ${this.storageService.getToken()}`})
    }
    return this.http.post<any>(`${environment.serverUrl}/${this.apiUrl}`, {liga: liga}, httpOptions)
  }
}
