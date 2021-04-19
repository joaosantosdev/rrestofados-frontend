import {Injectable} from '@angular/core';
import {Service} from './Service';
import {UrlHelper} from '../helpers/UrlHelper';
import {DialogAlert} from '../core/dialog-alert';

@Injectable()
export class TecidoService {
  public url = '/tecidos';

  constructor(private service: Service) {

  }

  public handlerError(error) {
    DialogAlert.error({message: error.error});
    return Promise.reject(error.error);
  }

  public async getTecidos(params = {}): Promise<any> {
    const url = (this.url + UrlHelper.formatParams(params));
    return await this.service.getSecurity(url).then(response => response).catch(this.handlerError);
  }

  public async getTecidosAll(): Promise<any> {
    return await this.service.getSecurity(`${this.url}/all`).then(response => response).catch(this.handlerError);
  }
  public async saveTecido(body): Promise<any> {
    const url = (this.url);
    return await this.service.postSecurity(url, body).then(response => response).catch(this.handlerError);
  }

  public async updateTecido(id, body): Promise<any> {
    const url = (this.url + `/${id}`);
    return await this.service.putSecurity(url, body).then(response => response).catch(this.handlerError);
  }
}
