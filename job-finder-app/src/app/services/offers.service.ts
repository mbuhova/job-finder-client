import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CredentialsStorage } from '../utils/credentials-storage';
import { Observable } from "rxjs";
import { AppConfig } from '../app.config';
import { HttpClient } from '../utils/http-client';

@Injectable()
export class OffersService {
    clientId: number;
    constructionPlaceId: number;

  constructor(
    private httpClient: HttpClient,
    private credentialsStorage: CredentialsStorage,        
    private config: AppConfig) { }

    getSearchCriteria(){
        //this.updateCredentials();
        
      return this.httpClient.get(this.config.apiUrl + 'api/offer/search');
    }

    searchOffers(){
    }

    updateCredentials(){
        let userInfo = this.credentialsStorage.getUserInfo();
        this.clientId = userInfo.client.clientId;
        this.constructionPlaceId = userInfo.constructionPlace.constructionPlaceId;
    }
}
