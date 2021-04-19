import {Service} from './Service';

export default class UsuarioService extends Service{
  async login(usuario: any){
    return await this.post('usuario/login', usuario);
  }

  async getUsuarioLogado(){
    return await this.getSecurity('usuario/logado');
  }

  async updateUsuario(id, usuario){
    return await this.putSecurity(`usuario/${id}`, usuario);

  }

}
