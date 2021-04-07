import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import { NgForm } from '@angular/forms';
import {User} from '../../User'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser : {userName: "", password: "", password2: ""};
  public success : boolean = false;
  public loading : boolean = false;
  public warning:string;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
     this.registerUser = {userName: "", password: "", password2: ""};
  }

  onSubmit(f: NgForm){

    if (this.registerUser.userName != undefined && this.registerUser.userName != "" 
          && this.registerUser.password == this.registerUser.password2){  
      
            this.loading = true;
      this.auth.register(this.registerUser).subscribe(
       
        (success) => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          this.warning = err.error.message;
          this.success = false;
          this.loading = false;
        }
      )
    } else {
      this.warning = "Please ensure passwords match and that you entered a username"
    }
  }

}
