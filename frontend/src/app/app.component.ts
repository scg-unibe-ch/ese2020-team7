import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              private  router: Router,
              private route: ActivatedRoute) { }

  userName = '';
  userToken: string;
  loggedIn = false;
  isAdmin: boolean;

  ngOnInit(): void {
    this.checkUserStatus();
  }
  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    // this.isAdmin = ((this.loggedIn) && (1 < 10));

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
    this.isAdmin = ((JSON.parse(localStorage.getItem('admin'))) && (this.loggedIn));
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
