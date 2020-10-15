import { Component, OnInit} from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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
    this.httpClient.post(environment.endpointURL + 'user/register', {
      userName: this.userName,
      password: this.password,
      email: this.email,
      lastName: this.lastName,
      firstName: this.firstName
    });
  }


}
