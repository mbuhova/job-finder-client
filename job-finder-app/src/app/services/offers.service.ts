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

    getMyOffers(){
        return this.httpClient.get(this.config.apiUrl + 'api/offer/myOffers', {});
    }

    getMyOfferDetails(id){
        return this.httpClient.get(this.config.apiUrl + `api/offer/myOffers/${id}`, {});
    }

    getSearchOfferDetails(id){
        return this.httpClient.get(this.config.apiUrl + `api/offer/searchOffer/${id}`, {});
    }

    searchOffers(searchCriteria){
        let params = new HttpParams()
        .set('keyword', searchCriteria.keyword)
        .set('isPermanent', searchCriteria.isPermanent)
        .set('isTemporary', searchCriteria.isTemporary)
        .set('isFullTime', searchCriteria.isFullTime)
        .set('isPartTime', searchCriteria.isPartTime);
        searchCriteria.selectedTowns.forEach(town => {
            params = params.append('selectedTowns', town);
          });
        searchCriteria.selectedBusinessSectors.forEach(sector => {
        params = params.append('selectedBusinessSectors', sector);
        });

        return this.httpClient.get(this.config.apiUrl + 'api/offer/searchOffers', params);
    }

    createOffer(data) {
        return this.httpClient.post(this.config.apiUrl + 'api/offer/createOffer', data);
    }

    // updateCredentials(){
    //     let userInfo = this.credentialsStorage.getUserInfo();
    // }
}
