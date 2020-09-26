import {Injectable} from '@angular/core';
import {Service} from './Service';
import {UrlHelper} from '../helpers/UrlHelper';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TecidoService{
  public url = 'v1/tecidos'
  constructor(private service:Service) {

  }
  public async getTecidos(params = {}) : Promise<any>{
    let url = (this.url+UrlHelper.formatParams(params));
    return await this.service.get(url).then(response=>response).catch(err=>{
      return Promise.reject('Erro'+err)
    })
  }
  public async saveTecido(body) : Promise<any>{
    let url = (this.url);
    return await this.service.post(url,body).then(response=>response).catch(err=>{
      return Promise.reject('Erro'+err)
    })
  }
  public async updateTecido(id,body) : Promise<any>{
    let url = (this.url+`/${id}`);
    return await this.service.put(url,body).then(response=>response).catch(err=>{
      return Promise.reject('Erro'+err)
    })
  }
  public async getCliente(id) : Promise<any>{
    let url = (this.url+`/${id}`);
    return await this.service.get(url).then(response=>response).catch(err=>{
      return Promise.reject('Erro'+err)
    })
  }
  public async deleteTecido(id) : Promise<any>{
    let url = (this.url+`/${id}`);
    return await this.service.delete(url).then(response=>response).catch(err=>{
      return Promise.reject('Erro'+err)
    })
  }
}
