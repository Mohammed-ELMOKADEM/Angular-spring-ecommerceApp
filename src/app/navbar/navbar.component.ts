import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  currentAction: any;
  keyword : String="";
  constructor(public appState : AppStateService, private userService : UserService, private productService : ProductService){}

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  showDropdown = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  public actions : Array<any> = [
    {name:"Home",path:"/home", icon:"house"},
    {name:"Products",path:"/products", icon:"bag"},
    {name:"New Product",path:"/newProduct", icon: "bag-plus"}
  ]
}
