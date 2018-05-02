import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

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
      
      return this.httpClient.post(this.config.apiUrl + 'Account/Login', { email: email, password: password, rememberMe: rememberMe })
          .map((response: Response) => {
              debugger;
              let userInfo = response.json();
              if(userInfo) {
                  this.credentialsStorage.setUserInfo(userInfo);
              }
          })
          .catch((error:any) => {
              return Observable.throw(error);
          });
  }

  test(){
    return this.httpClient.get(this.config.apiUrl + 'Account/Register')
    .map((response: Response) => {
        let data = response.json();
        return data;
    })
    .catch((error:any) => {
        return Observable.throw(error);
    });
  }

  isAuthenticated() {
      return !!this.credentialsStorage.getUserInfo();
  }

  logout() {
    this.credentialsStorage.removeUserInfo();
  }
}
