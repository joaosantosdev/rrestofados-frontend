import {Injectable} from '@angular/core';
import {Service} from './Service';
import {UrlHelper} from '../helpers/UrlHelper';
import {DialogAlert} from '../core/dialog-alert';

@Injectable()
export class ServicoService {
  public url = '/servicos';

  constructor(private service: Service) {

  }

  public handlerError(error) {
    DialogAlert.error({message: error.error});
    return Promise.reject(error.error);
  }

  public async saveServico(body): Promise<any> {
    return await this.service.postSecurity(this.url, body).then(response => response).catch(this.handlerError);
  }

  public async updateServico(id, body: any): Promise<any> {
    return await this.service.putSecurity(`${this.url}/${id}`, body).then(response => response).catch(this.handlerError);
  }

  public async getServicoById(id): Promise<any> {
    return await this.service.getSecurity(`${this.url}/${id}`).then(response => response).catch(this.handlerError);
  }

  public async getServicosFilter(params = {}): Promise<any> {
    const url = (this.url + UrlHelper.formatParams(params));
    return await this.service.getSecurity(url).then(response => response).catch(this.handlerError);
  }

  public async cancelServico(id, body: any): Promise<any> {
    return await this.service.putSecurity(`${this.url}/${id}/cancelar`, body).then(response => response).catch(this.handlerError);
  }

  public async saveImages(id, body: any): Promise<any> {
    return await this.service.postSecurity(`${this.url}/${id}/images`, body).then(response => response).catch(this.handlerError);
  }
  public async getImages(id): Promise<any> {
    return await this.service.getSecurity(`${this.url}/${id}/images`).then(response => response).catch(this.handlerError);
  }
}
