import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ObservableInput } from 'rxjs/Observable';

import { Error } from '../models/error';

@Injectable()
export class HttpClient {

  static unauthorized: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) {}

  createHeaders(headers: Headers) {
    headers.append('Accept', 'application/json');
  }

  private appendNoCacheHeaders(headers: Headers) {
    // IE 11 needs these headers because the GET request is cached
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
  }

  get(url: string) {
    let headers = new Headers();
    this.createHeaders(headers);
    this.appendNoCacheHeaders(headers);
    return this.http.get(url, {
      headers: headers
    })
    .catch(this.handlerError);
  }

  post(url: string, data: any) {
    let headers = new Headers();
    this.createHeaders(headers);
    return this.http.post(url, data, {
      headers: headers
    })
    .catch(this.handlerError);
  }

  put(url: string, data: any){
    let headers = new Headers();
    this.createHeaders(headers);
    return this.http.put(url, data, {
      headers: headers
    })
    .catch(this.handlerError);
  }

  delete(url: string){
    let headers = new Headers();
    this.createHeaders(headers);
    return this.http.delete(url, {
      headers: headers
    })
    .catch(this.handlerError);
  }

  private handlerError(error: Response | any, caught: Observable<any>) : ObservableInput<any> {

    if(error.status == 401){
      HttpClient.unauthorized.emit();
    }

    let errorModel: Error;
    try{
      let errorData = error.json();
      errorModel = new Error(errorData.message, errorData.detail, error.status);
    } catch (ex) {
      errorModel = new Error(error.statusText, null, error.status);
    }

    return Observable.throw(errorModel);
  }
}