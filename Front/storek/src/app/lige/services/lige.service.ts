import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';
import { RezultatRequest } from 'src/app/shared/models/rezultatRequest';
import { Tim } from 'src/app/shared/models/tim';
import { TimRequest } from 'src/app/shared/models/timRequest';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LigeService {
  private apiUrl: string = "tim"
  private apiAdd: string = "teaminfo"
  constructor(
    private http: HttpClient,
    private storageService: StorageService
    ) { }

  public getAllTims(liga: number): Observable<Tim[]>{
    return this.http.get<Tim[]>(`${environment.serverUrl}/${this.apiUrl}/${liga}`);
  }

  public getTimInfo(liga: number): Observable<any>{
    return this.http.get<any>(`${environment.serverUrl}/${this.apiUrl}/${this.apiAdd}/${liga}`);
  }

  public addTim(tim: TimRequest): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',  'Authorization': `Bearer ${this.storageService.getToken()}`})
    }
    return this.http.post<any>(`${environment.serverUrl}/${this.apiUrl}`, tim, httpOptions)
  }

  public updateTim(tim: TimRequest): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',  'Authorization': `Bearer ${this.storageService.getToken()}`})
    }
    return this.http.put<any>(`${environment.serverUrl}/${this.apiUrl}`, tim, httpOptions)
  }

  public obrisiTim(id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',  'Authorization': `Bearer ${this.storageService.getToken()}`})
    }
    return this.http.delete<any>(`${environment.serverUrl}/${this.apiUrl}/${id}`, httpOptions)
  }

  public addRezultat(rezultat: FormData): Observable<any>{
    return this.http.post<any>(`${environment.serverUrl}/${this.apiUrl}/dodajmec`, rezultat)
  }

  
}
