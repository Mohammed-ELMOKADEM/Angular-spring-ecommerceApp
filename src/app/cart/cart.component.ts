import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public appState : AppStateService, private router : Router){}
  isToggle : boolean = false;;

  
  toggleCart() {
    this.isToggle = !this.isToggle
  }
  logout() {
    this.appState.authState = {};
    this.router.navigateByUrl("/login");
  }
  login() {
    this.router.navigateByUrl("/login");
  }
} 
