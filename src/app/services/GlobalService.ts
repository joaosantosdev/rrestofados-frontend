import {Injectable} from '@angular/core';
import {Service} from './Service';
import {UrlHelper} from '../helpers/UrlHelper';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GlobalService{
  public url = 'v1/global'
  constructor(private service:Service) {

  }
  public async getEstados() : Promise<any>{
    let url = (this.url+"/estados");
    return await this.service.get(url).then(response=>response).catch(err=>{
      return Promise.reject('Erro'+err)
    })
  }
  public async getMunicipios(estado, paginacao?: { size: number; nome: string; page: number }) : Promise<any>{
    let url = (this.url+`/municipios/${estado}${UrlHelper.formatParams(paginacao)}`);
    return await this.service.get(url).then(response=>response).catch(err=>{
      return Promise.reject('Erro'+err)
    })
  }
}
