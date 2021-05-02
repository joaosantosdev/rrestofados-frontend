import {Injectable} from '@angular/core';
import {Service} from './Service';
import {DialogAlert} from '../core/dialog-alert';

@Injectable()
export class UtilsService{
  public url = '';
  constructor(private service: Service) {

  }
  public handlerError(error){
    DialogAlert.error({ message: error.error });
    return Promise.reject(error.error);
  }
  public async getEstados(): Promise<any>{
    const url = (this.url + '/estados');
    return await this.service.getSecurity(url).then(response => response).catch(this.handlerError);
  }
  public async getMunicipios(estado): Promise<any>{
    const url = `${this.url}/estado/${estado}/municipios`;
    return await this.service.getSecurity(url).then(response => response).catch(this.handlerError);
  }
}
