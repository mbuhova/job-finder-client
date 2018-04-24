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
  
  login(userId: string, constructionId: string, password: string) {
      return this.httpClient.post(this.config.apiUrl + 'login', { userId: userId, constructionId: constructionId, password: password })
          .map((response: Response) => {
              let userInfo = response.json();
              if(userInfo.client && userInfo.constructionPlace) {
                  this.credentialsStorage.setUserInfo(userInfo);
              }

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
