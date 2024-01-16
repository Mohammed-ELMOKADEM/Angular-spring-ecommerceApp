import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, newUser } from '../types';
import { Observable } from 'rxjs';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private appState : AppStateService
  ) {}
  
  public addUser(user : newUser) : Observable<String>{
    return this.http.post<String>("http://localhost:8080/api/auth/register",user);
  }

  public getUser(email : String) : Observable<User>{
    return this.http.get<User>("http://localhost:8080/api/user/"+email,{headers:this.appState.authState['headers']});
  }
}
