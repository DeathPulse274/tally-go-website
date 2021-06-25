import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient,) { }

  jwtToken: any;
  decoded: any;
  userName: string;
  password: string;
  pin: string;

  ngOnInit() {
  }

  login() {
    //this.router.navigate(['/your-computer']);
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.login, {
      "username": this.userName,
      "password": this.password,
      "pin": this.pin
      // "username": "vssht@amazon.com",
      // "password": "test123",
      // "pin": "321456"
    }, {
      headers: header1
    }).subscribe(data => {
      this.jwtToken = data;
      this.jwtToken = this.jwtToken.token;
      this.decoded = jwt_decode(this.jwtToken);
      //this.userName = 'vssht@amazon.com';
      sessionStorage.setItem('jwt-token', this.jwtToken);
      sessionStorage.setItem('username', this.userName);
      this.userName = sessionStorage.getItem('username');

      this.router.navigate(['/your-computer']);

    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }
}
