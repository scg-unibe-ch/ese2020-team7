import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userNameOrMail = '';
  password = '';

  userToken: string;
  loggedIn = false;
  isAdmin: boolean;
  loginError: boolean;
  errorMessage: string;

  secureEndpointResponse = '';

  constructor(private httpClient: HttpClient,
              private  router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userNameOrMail = localStorage.getItem('userName');
    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  login(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userNameOrMail: this.userNameOrMail,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('admin', res.user.admin);
      localStorage.setItem('userId', res.user.userId);
      this.isAdmin = res.user.admin;
      this.checkUserStatus();
      window.location.reload();
    }, (error) => {
      this.loginError = true;
      this.errorMessage = error?.message;
    });
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('admin');
    localStorage.removeItem('userId');

    this.checkUserStatus();
    this.back();
  }

  back(): void {
    this.router.navigate(['../../..'], { relativeTo: this.route });
  }
}
