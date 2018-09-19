
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { HttpClient } from '../utils/http-client';
import { CredentialsStorage } from '../utils/credentials-storage';

@Injectable()
export class AuthenticationService {
  
  constructor(
    private httpClient: HttpClient,
    private config: AppConfig,
    private credentialsStorage: CredentialsStorage) { }
  
  login(email: string, password: string, rememberMe: boolean) {
      rememberMe = rememberMe ? true : false;
      
      return this.httpClient.post(this.config.apiUrl + 'Account/Login', { email: email, password: password, rememberMe: rememberMe });
  }

  test(){
    return this.httpClient.get(this.config.apiUrl + 'Account/Register')
    .subscribe((response: Response) => {
        let data = response;
        return data;
    },
    (error: any) => {
      return observableThrowError(error);
    });
  }

  isAuthenticated() {
      return !!this.credentialsStorage.getUserInfo();
  }

  logout() {
    this.credentialsStorage.removeUserInfo();
  }
}
