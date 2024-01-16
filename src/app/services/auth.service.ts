import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }


  public authenticate(Credential:any) : Observable<String>{
    return this.http.post<String>("http://localhost:8080/api/auth/authenticate",Credential);
  }
}
