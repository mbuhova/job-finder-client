
import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { AppConfig } from '../app.config';
import { HttpClient } from '../utils/http-client';
import { CredentialsStorage } from '../utils/credentials-storage';

@Injectable()
export class AuthenticationService {

  @Output() loggedInUser: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private httpClient: HttpClient,
    private config: AppConfig,
    private router: Router,
    private credentialsStorage: CredentialsStorage) { }

  public login(email: string, password: string, rememberMe: boolean) {
    rememberMe = rememberMe ? true : false;
    
    this.httpClient.post(this.config.apiUrl + 'Account/Login', { email: email, password: password, rememberMe: rememberMe })
      .subscribe(
        (data: any) => {
          let userInfo = data;
          if (userInfo) {
            this.credentialsStorage.setUserInfo(userInfo);
            this.loggedInUser.emit(userInfo);
          }
          this.router.navigate(['/searchOffers']);
        },
        (error: any) => {
          //this.errorMessage = error.message;
        });
  }

  registerUser(email: string, password: string, confirmPassword: string) {
    return this.httpClient.post(this.config.apiUrl + 'Account/Register', {
      email: email, password: password, confirmPassword: confirmPassword
    });
  }

  registerCompany(model) {
    return this.httpClient.post(this.config.apiUrl + 'Account/RegisterCompany', 
    { 
      email: model.email, 
      password: model.password, 
      confirmPassword: model.confirmPassword, 
      bulstat: model.bulstat, 
      townId: parseInt(model.townId)
    }
    );
  }

  isAuthenticated() {
    return !!this.credentialsStorage.getUserInfo();
  }

  logout() {
    this.credentialsStorage.removeUserInfo();
  }
}
