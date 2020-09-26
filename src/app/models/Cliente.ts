import {Endereco} from './Endereco';
import {Telefone} from './Telefone';

export class Cliente {
  public nome = "";
  public email = "";
  public endereco = new Endereco()
  public telefones = []
}
