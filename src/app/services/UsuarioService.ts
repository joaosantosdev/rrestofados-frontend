import {Service} from './Service';

export default class UsuarioService extends Service {

  async login(usuario: any) {
    return await this.post('usuario/login', usuario, {noLoading: true});
  }

  async getUsuarioLogado() {
    console.log('aqui');
    return await this.getSecurity('usuario/logado');
  }

  async getUsers() {
    return await this.getSecurity('usuario');
  }

  async updateUsuario(usuario) {
    return await this.putSecurity(`usuario`, usuario);
  }

  async createUser(usuario) {
    return await this.postSecurity(`usuario`, usuario);
  }

  async updateStatus(id) {
    return await this.getSecurity(`usuario/${id}/updatestatus`);
  }
}
