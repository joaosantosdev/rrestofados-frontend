import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Utils} from '../core/utils';
import {environment} from '../../environments/environment';

@Injectable()
export class Service {

  private baseUrl = environment.baseUrl;

  get headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: Utils.getToken()
    });
  }

  constructor(private http: HttpClient) {

  }

  public handlerError(error) {
    return Promise.reject(error.error);
  }

  public getHeaders() {
    return;
  }

  public async delete(url) {
    return this.http.delete(this.baseUrl + url).toPromise();
  }

  public async deleteSecurity(url) {
    return this.http.delete(this.baseUrl + url, {
      headers: this.headers
    }).toPromise();
  }

  public async get(url) {
    return this.http.get(this.baseUrl + url, {}).toPromise();
  }

  public async getSecurity(url) {
    return await this.http.get(this.baseUrl + url, {
      headers: this.headers
    }).toPromise();
  }

  public put(url, body) {
    return this.http.put(this.baseUrl + url, JSON.stringify(body), {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }).toPromise();

  }

  public putSecurity(url, body) {
    return this.http.put(this.baseUrl + url, JSON.stringify(body), {
      headers: this.headers
    }).toPromise();

  }

  public postSecurity(url, body) {
    return this.http.post(this.baseUrl + url, JSON.stringify(body), {
      headers: this.headers
    }).toPromise();
  }

  public post(url, body, config = {}) {
    console.log(config);
    return this.http.post(this.baseUrl + url, JSON.stringify(body), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...config
      }),


    }).toPromise();

  }

}
