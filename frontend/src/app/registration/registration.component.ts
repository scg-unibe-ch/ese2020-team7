import { Component, OnInit} from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder) {
  }

  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!?-_{}()*/])(?=\\S+$).{7,}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';


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
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    gender: [null],
    telephoneNumber: [null],
    street: [null],
    pinCode: [null],
    city: [null],
    country: [null],
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
      firstName: this.userForm.get('firstName').value,
      gender: this.userForm.get('gender').value,
      telephoneNumber: this.userForm.get('telephoneNumber').value,
      street: this.userForm.get('street').value,
      pinCode: this.userForm.get('pinCode').value,
      city: this.userForm.get('city').value,
      country: this.userForm.get('country').value,
    }).subscribe(() => {
      this.registrationDone = true;
    }, (error) => {
         this.error = true;
         this.errorMessage = error;
    });
  }
}

