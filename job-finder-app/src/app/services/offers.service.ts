import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CredentialsStorage } from '../utils/credentials-storage';

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
        
      return this.httpClient.get(this.config.apiUrl + 'api/offer/search')
          .map((response: Response) => {
              let data = response.json();
              return data;
          })
          .catch((error:any) => {
              return Observable.throw(error);
          });
    }

    getDeliveriesByStatus(){
        this.updateCredentials();
        
        return this.httpClient.get(this.config.apiUrl + 'deliveries/statuses?statusIds=4&statusIds=5')
            .map((response: Response) => {
                let deliveries = response.json();
                return deliveries;
            })
            .catch((error:any) => {
                return Observable.throw(error);
            });
      }

      getDeliveredAmountsPerTypes(){
        this.updateCredentials();
        
        return this.httpClient.get(this.config.apiUrl + 'deliveries/categories?categories=0&categories=11&clientId='
            + this.clientId + "&constructionPlaceId=" + this.constructionPlaceId)
            .map((response: Response) => {
                let betonTypes = response.json();
                return betonTypes;
            })
            .catch((error:any) => {
                return Observable.throw(error);
            });
      }
    
      getAllByType(categoryId){
        this.updateCredentials();
          
        return this.httpClient.get(this.config.apiUrl + 'deliveries/category?categoryId=' + categoryId + '&clientId='
            + this.clientId + "&constructionPlaceId=" + this.constructionPlaceId)
            .map((response: Response) => {
                let betonTypes = response.json();
                return betonTypes;
            })
            .catch((error:any) => {
                return Observable.throw(error);
            });
      }

      updateCredentials(){
        let userInfo = this.credentialsStorage.getUserInfo();
        this.clientId = userInfo.client.clientId;
        this.constructionPlaceId = userInfo.constructionPlace.constructionPlaceId;
      }
}
