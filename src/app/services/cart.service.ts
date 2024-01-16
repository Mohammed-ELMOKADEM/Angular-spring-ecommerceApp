import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';
import { Product, User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http : HttpClient, private appState : AppStateService) { }

  public addOrder(userId : number, idProduct: number) {
    const url = 'http://localhost:8080/api/addOrder';
    const requestBody = { userId, idProduct };
    const headers = this.appState.authState.headers;
    return this.http.post<any>(url, requestBody, { headers });
  }

  public getCart(userId : number){
    const headers = this.appState.authState.headers;
    const url = 'http://localhost:8080/api/getOrders/';
    return this.http.get<any>(url+userId,{headers:headers});
  }

}
