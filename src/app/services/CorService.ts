import {DialogAlert} from 'src/app/core/dialog-alert';
import {Injectable} from '@angular/core';
import {Service} from './Service';
import {UrlHelper} from './../helpers/UrlHelper';

@Injectable()
export class CorService {
  public url = '/cor';

  constructor(private service: Service) {

  }

  public handlerError(error) {
    DialogAlert.error({message: error.error});
    return Promise.reject(error.error);
  }

  public async getCores(params = {}): Promise<any> {
    const url = (this.url + UrlHelper.formatParams(params));
    return await this.service.getSecurity(url).then(response => response).catch(this.handlerError);
  }

  public async getCoresAll(): Promise<any> {
    return await this.service.getSecurity(`${this.url}/all`).then(response => response).catch(this.handlerError);
  }
  public async getCor(id): Promise<any> {
    return await this.service.getSecurity(`${this.url}/${id}`).then(response => response).catch(this.handlerError);
  }

  public async saveCor(body): Promise<any> {
    const url = (this.url);
    return await this.service.postSecurity(url, body).then(response => response).catch(this.handlerError);
  }

  public async updateCor(id, body): Promise<any> {
    const url = (this.url + `/${id}`);
    return await this.service.putSecurity(url, body).then(response => response).catch(this.handlerError);
  }
}
