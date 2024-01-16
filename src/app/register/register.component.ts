import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newUser } from '../types';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  public form !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private userService : UserService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname : this.fb.control(""),
      lastname : this.fb.control(""),
      email : this.fb.control("", Validators.email),
      password : this.fb.control(""),
    })
  }

  createUser(){
    let user : newUser = this.form.value;
    this.userService.addUser(user).subscribe({
      next: token=>{
        this.router.navigateByUrl("/login");
      },
      error: err=>{
        console.log(err);
      }
    })
  }


}
