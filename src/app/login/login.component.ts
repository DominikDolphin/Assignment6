import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
  loading: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = { userName: "", password: "", _id: null };
  }


  onSubmit(f: NgForm): void {

    if (this.user.userName != "" && this.user.password != "") {
      this.loading = true;
      this.auth.login(this.user).subscribe(
        (success) => {
          this.loading = false;
          
          localStorage.setItem('access_token', success.token);
          console.log(this.auth.getToken());
          this.router.navigate(['/newReleases']);
        },
        (err) => {
          this.loading = false;
          this.warning = err.error.message;
        }
      );
    } else {
      this.warning = "Please fill in all fields";
    }
  }
}
