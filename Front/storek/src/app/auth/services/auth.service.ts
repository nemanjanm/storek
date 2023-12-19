import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = "user/login"

  constructor(private http: HttpClient) { }
  
  public login(username: string, password: string): Observable<any>{
    return this.http.post<any>(`${environment.serverUrl}/${this.apiUrl}`, {
      username: username,
      password: password
    })
  } 
}
