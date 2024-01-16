import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Product, User } from '../types';
import {jwtDecode} from 'jwt-decode';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  constructor(
    private fb:FormBuilder,
    private auth : AuthService,
    private router : Router,
    private appState : AppStateService,
    private userService : UserService,
    private orderService : CartService
  ){}

  public token !: any;
  public formLogin !: FormGroup;
  private products : Product[] = [];

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  login() {
    this.auth.authenticate(this.formLogin.value).subscribe({
      next : data =>{
        let user !: User;
        this.token=data;
        let decodedJWT:any = jwtDecode(this.token.token);
        let email = decodedJWT.sub;
        this.appState.setAuthState({
          isAuthenticated : true,
          token : this.token,
          headers : new HttpHeaders().set('Authorization', 'Bearer '+this.token.token)
        })
        this.userService.getUser(email).subscribe({
          next: userLogged =>{
            user = userLogged;
            this.orderService.getCart(user.userId).subscribe({
              next: orders =>{
                let size: number =orders.length
                let price : number=0;
                this.appState.setAuthState({
                  totalNumberOrders : size,
                })
                orders.forEach((order:any) => {
                  let product :Product = order.product as Product;
                  price+=product.price
                  this.products.push(product);
                });
                this.appState.setCartState({
                  products : this.products,
                  totalPrice : price
                })
              },
              error : err =>{
                console.log(err);
              }
            })
            this.appState.setAuthState({
              user : user
            });
            console.log(this.appState.authState)
          },
          error : err =>{
            console.log(err);
          }
        })
        this.router.navigateByUrl("/home");
      },
      error: err =>{
        console.log(err);
      }
    })
  }

}

