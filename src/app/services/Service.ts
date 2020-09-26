import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class Service {

  private baseUrl ='http://rrestofados.com:9090/'
  constructor(private http:HttpClient) {

  }
  public async delete(url){
    return this.http.delete(this.baseUrl+url).toPromise();
  }
  public async get(url){
    return this.http.get(this.baseUrl+url).toPromise();
  }
  public put(url,body){

    return this.http.put(this.baseUrl+url,JSON.stringify(body),{
      headers:new HttpHeaders({
        'content-type':'application/json'
      })
    }).toPromise();

  }
  public post(url,body){

    return this.http.post(this.baseUrl+url,JSON.stringify(body),{
      headers:new HttpHeaders({
        'content-type':'application/json'
      })
    }).toPromise();

  }

}
