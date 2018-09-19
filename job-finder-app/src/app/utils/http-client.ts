
import {throwError as observableThrowError,  Observable } from 'rxjs';
import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient as angularHttpClient, HttpHeaders} from '@angular/common/http';
import { CredentialsStorage } from '../utils/credentials-storage';
import { Error } from '../models/error';

@Injectable()
export class HttpClient {
  static unauthorized: EventEmitter<any> = new EventEmitter();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.credentialsStorage.getUserInfo() ? 'Bearer ' + this.credentialsStorage.getUserInfo().token : ''
    })
  };

  constructor(private http: angularHttpClient, private credentialsStorage: CredentialsStorage) {}

  private appendNoCacheHeaders(headers: Headers) {
    // IE 11 needs these headers because the GET request is cached
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
  }


  get(url: string) {
    return this.http.get(url, this.httpOptions);
  }

  post(url: string, data: any) {
    return this.http.post(url, data, this.httpOptions);
  }

  put(url: string, data: any){
    return this.http.put(url, data, this.httpOptions);
  }

  delete(url: string){
    return this.http.delete(url, this.httpOptions);
  }
}