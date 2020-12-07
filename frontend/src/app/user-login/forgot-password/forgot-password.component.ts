import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import './../../../assets/smtp.js';
declare let Email: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

    userToken: string;
    loggedIn = false;
    possibleUserEmail: string;
    isUser: boolean;
    sentEmail: boolean;
    mailNotFoundError: boolean;
    errorMessage: string;
    userEmail: string;

    constructor(private httpClient: HttpClient,
        private  router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.checkUserStatus();
      }
    
      checkUserStatus(): void {
        this.userToken = localStorage.getItem('userToken');
        this.loggedIn = !!(this.userToken);
      }

    forgotPassword() : void {
        this.httpClient.post(environment.endpointURL + 'forgot-password', {
            possibleUserEmail: this.possibleUserEmail
        }).subscribe((res: any) => {
            localStorage.setItem('userMail', res.user.email);
            this.sendEmail(this.possibleUserEmail);
        }, (error) => {
            this.mailNotFoundError = true;
            this.errorMessage = error?.message;
    });
}
       
    
    sendEmail(userEmail: string) : void {
        Email.send({
            Host: 'smtp.elasticemail.com',
            Username: 'noreply.ese2020team7@gmail.com',
            Password: '768AA55B3E69BACD1EECFAB5B16ED794D0B2',
            To: userEmail,
            From: 'noreply.ese2020team7@gmail.com',
            Subject: 'Password Retrieval',
            Body: `
                <h2>Please click on given link to reset your password.</h2>
                <p>http://localhost:4200/settings</p> `
        }).then(message => {alert(message)});
        }
}