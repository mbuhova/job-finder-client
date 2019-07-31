import { Component, OnInit } from '@angular/core';
import { StatePage } from '../utils/state.component';
import { CredentialsStorage } from '../utils/credentials-storage';
import { DoCheck, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent extends StatePage implements OnInit {
  errorMessage: string;
  towns: any[];
  businessSectors: any[];
  role: string;

  constructor(
    private authenticationService: AuthenticationService,    
    private credentialsStorage: CredentialsStorage) {
    super();
  }

  logout() {
    this.credentialsStorage.removeUserInfo();
    this.role = '';
  }

  ngOnInit() {
    this.role = this.credentialsStorage.getUserInfo() ? this.credentialsStorage.getUserInfo().role : '';

    this.authenticationService.loggedInUser.subscribe(userInfo => {
      this.role = !!userInfo ? userInfo.role : '';
    });
  }
}

