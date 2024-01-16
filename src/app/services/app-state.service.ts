import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor() { }

  private user !: User;

  public authState:any = {
    isAuthenticated : false,
    token : "",
    headers : new HttpHeaders(),
    user : this.user,
    totalNumberOrders : 0
  }

  public cartState : any={
    products : [{}],
    totalPrice : 0
  }


  public setAuthState(state: any) : void{
    this.authState = {...this.authState, ...state}
  }

  public setCartState(state: any) : void{
    this.cartState = {...this.cartState, ...state}
  }

}
