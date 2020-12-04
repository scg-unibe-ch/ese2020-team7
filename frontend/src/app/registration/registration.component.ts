import { Component, OnInit} from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder) {
  }

  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{7,}$';

  userName = '';
  userToken: string;
  loggedIn = false;
  registrationDone = false;
  submitted = false;

  error: boolean;
  errorMessage: string;

  userForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required]
  });

  // convenience getter for easy access to form fields
  get f(): any { return this.userForm.controls; }

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
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.httpClient.post(environment.endpointURL + 'user/register', {
      userName: this.userForm.get('userName').value,
      password: this.userForm.get('password').value,
      email: this.userForm.get('email').value,
      lastName: this.userForm.get('lastName').value,
      firstName: this.userForm.get('firstName').value
    }).subscribe(() => {
      this.registrationDone = true;
    }, (error) => {
         this.error = true;
         this.errorMessage = error;
    });
  }
}

