/*********************************************************************************
*  WEB422 – Assignment 05
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Dominik Thibaudeau  Student ID: 110924198  Date: 24/03/2021
*
********************************************************************************/

import { Component, OnInit, } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import {AuthService} from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'web422-a4';
  searchString: string;
  public token: any;

  ngOnInit(){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }

  constructor( private router: Router, private auth: AuthService ){}

  handleSearch(){
    this.router.navigate(['/search'], {queryParams: {q: this.searchString}});
    this.searchString = "";
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
