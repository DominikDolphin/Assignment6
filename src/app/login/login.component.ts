import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //user: {userName: "", password: "", _id: null};]
  user;
  warning: string;
  loading : boolean = false;
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.user = {userName: "", password: "", _id: null};
  }


  onSubmit(f: NgForm): void {
    console.log("click")
    console.log(this.user);
    this.auth.login(this.user).subscribe(
      (success) => {
        // store the returned token in local storage as 'access_token'
        localStorage.setItem('access_token',success.token);
        // redirect to the "vehicles" route
        this.router.navigate(['/newReleases']);
      },
      (err) => {
        this.warning = err.error.message;
      }
    );

  }
}
