import {Injectable} from '@angular/core';
import {Service} from './Service';
import {UrlHelper} from '../helpers/UrlHelper';
import {DialogAlert} from '../core/dialog-alert';

@Injectable()
export class ClientService {
  public url = '/clientes';

  constructor(private service: Service) {

  }

  public handlerError(error) {
    DialogAlert.error({message: error.error});
    return Promise.reject(error.error);
  }

  public async saveClient(body): Promise<any> {
    return await this.service.postSecurity(this.url, body).then(response => response).catch(this.handlerError);
  }
  public async updateClient(id,body): Promise<any> {
    return await this.service.putSecurity(`${this.url}/${id}`, body).then(response => response).catch(this.handlerError);
  }
  public async getClients(params): Promise<any> {
    const url = (this.url + UrlHelper.formatParams(params));
    return await this.service.getSecurity(url).then(response => response).catch(this.handlerError);
  }

  public async deleteClientById(id): Promise<any>{
    return await this.service.deleteSecurity(`${this.url}/${id}`).then(response => response).catch(this.handlerError);
  }

  public async getClientById(id): Promise<any>{
    return await this.service.getSecurity(`${this.url}/${id}`).then(response => response).catch(this.handlerError);
  }

}
