/*********************************************************************************
*  WEB422 – Assignment 05
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Dominik  Student ID:   Date: 
*
********************************************************************************/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web422-a4';
  searchString: string;

  constructor( private router: Router ){}

  handleSearch(){
    console.log("saechring!!");
    this.router.navigate(['/search'], {queryParams: {q: this.searchString}});
  }
}
