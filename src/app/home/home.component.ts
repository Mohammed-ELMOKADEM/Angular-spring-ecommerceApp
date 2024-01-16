import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { UserService } from '../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public appState : AppStateService, private userService : UserService){}

  ngOnInit(): void {
    
  }
  
}
