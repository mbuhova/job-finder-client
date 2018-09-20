import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CredentialsStorage } from '../utils/credentials-storage';
import { Observable } from "rxjs";
import { AppConfig } from '../app.config';
import { HttpClient } from '../utils/http-client';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class OffersService {
    offersSearchResult: any;

  constructor(
    private httpClient: HttpClient,
    private credentialsStorage: CredentialsStorage,        
    private config: AppConfig) { }

    getSearchCriteria(){
        //this.updateCredentials();
        
      return this.httpClient.get(this.config.apiUrl + 'api/offer/search', {});
    }

    saveData(data){
        this.offersSearchResult = data;
    }

    getData(){
        return this.offersSearchResult;
    }

    searchOffers(searchCriteria){
        let params = new HttpParams()
        .set('keyword', searchCriteria.keyword)
        .set('isPermanent', searchCriteria.isPermanent)
        .set('isTemporary', searchCriteria.isTemporary)
        .set('isFullTime', searchCriteria.isFullTime)
        .set('isPartTime', searchCriteria.isPartTime)
        .set('selectedTowns', searchCriteria.selectedTowns)
        .set('selectedBusinessSectors', searchCriteria.selectedBusinessSectors);
      return this.httpClient.get(this.config.apiUrl + 'api/offer/searchOffers', params);
    }

    // updateCredentials(){
    //     let userInfo = this.credentialsStorage.getUserInfo();
    // }
}
