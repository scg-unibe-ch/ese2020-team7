import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/** Expansion panel to add admins from admin's panel */

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})

export class AddAdminComponent implements OnInit {
  users: User [] = [];
  isAdmin: boolean;


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'user/').subscribe((instances: User[]) => {
      console.log(instances);
      this.users = instances;
    });
  }

  promoteAdmin(user: User): void {
    this.httpClient.put(environment.endpointURL + 'user/promoteAdmin' + user.userName, {}).subscribe();
  }

  demoteAdmin(user: User): void {
    this.httpClient.put(environment.endpointURL + 'user/demoteAdmin' + user.userName, {}).subscribe();

  }
  checkAdminStatus(): void {
    this.isAdmin = JSON.parse(localStorage.getItem('admin'));
  }
  }

