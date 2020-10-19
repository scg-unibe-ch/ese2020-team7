import { Component, OnInit} from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {UserAttributes} from '../../../../backend/src/models/user.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userName = '';
  password = '';
  email = '';
  firstName = '';
  lastName = '';

  userToken: string;
  loggedIn = false;
  registrationDone: boolean;

  error: boolean;
  errorMessage: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  register(): void{
    if (this.userName == null || this.userName === '') {
       this.error = true;
       this.errorMessage = 'User name is required!';
       return;
    }
    if (this.password == null || this.password === '') {
      this.error = true;
      this.errorMessage = 'Password is required!';
      return;
    }
    if (this.password == null || this.password === '') {
      this.error = true;
      this.errorMessage = 'Password is required!';
      return;
    }
    if (this.password.length < 8 ) {
      this.error = true;
      this.errorMessage = 'Password must be at least 8 caracters!';
      return;
    }
    this.httpClient.post(environment.endpointURL + 'user/register', {
      userName: this.userName,
      password: this.password,
      email: this.email,
      lastName: this.lastName,
      firstName: this.firstName
    }).subscribe((result: UserAttributes) => {
      this.registrationDone = true;
      // tslint:disable-next-line:no-unused-expression
    }), (error => {
         this.error = true;
         this.errorMessage = error;
    });
  }


}
