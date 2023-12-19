import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';
import { Vest } from 'src/app/shared/models/vest';
import { VestRequest } from 'src/app/shared/models/vestRequest';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VestiService {
  private apiUrl: string = "vest"
  constructor(
    private http: HttpClient,
    private storageService: StorageService
    ) { }

  public getAllVesti(): Observable<Vest[]>{
    return this.http.get<Vest[]>(`${environment.serverUrl}/${this.apiUrl}`);
  }
  
  public updateVest(vest: VestRequest): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',  'Authorization': `Bearer ${this.storageService.getToken()}`})
    }
    return this.http.put<any>(`${environment.serverUrl}/${this.apiUrl}`, vest, httpOptions)
  }
  
  public dodajeVest(vest: VestRequest): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',  'Authorization': `Bearer ${this.storageService.getToken()}`})
    }
    return this.http.post<any>(`${environment.serverUrl}/${this.apiUrl}`, vest, httpOptions)
  } 

  public obrisiVest(id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',  'Authorization': `Bearer ${this.storageService.getToken()}`})
    }
    return this.http.delete<any>(`${environment.serverUrl}/${this.apiUrl}/${id}`, httpOptions)
  } 
}
