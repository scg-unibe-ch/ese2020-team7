import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User = new User(null, null, null, null, null, null, null, null, null, null, null, null, null, null);

  id: string;
  userId: number;
  userName = '';
  userToken: string;
  loggedIn = false;
  submissionDone = false;
  changePasswordDone = false;
  userSubmitted = false;
  passwordSubmitted = false;
  oldHide = true;
  newHide = true;


  userNameOrMail = '';
  loginError: boolean;
  error: boolean;
  errorMessage: string;
  passwordErrorMessage: string;
  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{7,}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  userForm = this.formBuilder.group({
    userName: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
    gender: [null],
    telephoneNumber: [null],
    street: [null],
    pinCode: [null],
    city: [null],
    country: [null],
  });

  passwordForm = this.formBuilder.group({
    oldPassword: [null, Validators.required],
    password: [null, [Validators.required, Validators.pattern(this.passwordPattern)]],
  });

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder) {
  }

  get f(): any {
    return this.userForm.controls;
  }
  get g(): any {
    return this.passwordForm.controls;
  }

  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'user/id/' + this.userId, {}).subscribe((user: User) => {
      console.log(user);
      this.user = user;
      this.userForm.patchValue({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        telephoneNumber: user.telephoneNumber,
        street: user.street,
        pinCode: user.pinCode,
        city: user.city,
        country: user.country,
      });
    });
  }

  checkUserStatus(): void {
    this.userId = JSON.parse(localStorage.getItem('userId'));
    this.userToken = localStorage.getItem('userToken');
    this.userNameOrMail = localStorage.getItem('userName');
    this.loggedIn = !!(this.userToken);
  }

  edit(): void {
    this.userSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.httpClient.put(environment.endpointURL + 'user/update/' + this.userId, {
      userName: this.userForm.get('userName').value,
      firstName: this.userForm.get('firstName').value,
      lastName: this.userForm.get('lastName').value,
      email: this.userForm.get('email').value,
      gender: this.userForm.get('gender').value,
      telephoneNumber: this.userForm.get('telephoneNumber').value,
      street: this.userForm.get('street').value,
      pinCode: this.userForm.get('pinCode').value,
      city: this.userForm.get('city').value,
      country: this.userForm.get('country').value,
    }).subscribe(() => {
      this.submissionDone = true;
    }, (error) => {
      this.error = true;
      this.errorMessage = error;
    });
  }

  changePassword(): void {
    this.passwordSubmitted = true;
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userNameOrMail: this.userNameOrMail,
      password: this.passwordForm.get('oldPassword').value,
    }).subscribe(() => {
      if (this.passwordForm.invalid) {
        return;
      }
      this.httpClient.put(environment.endpointURL + 'user/update/' + this.userId, {
        password: this.passwordForm.get('password').value,
      }).subscribe(() => {
        this.changePasswordDone = true;
      }, (error) => {
        this.error = true;
        this.errorMessage = error;
      });
    }, (error) => {
      this.loginError = true;
      this.passwordErrorMessage = error?.message;
    });
  }
  changingPassword(): void {
    this.loginError = false;
  }
}
