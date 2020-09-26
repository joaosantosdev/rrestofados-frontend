import {Municipio} from './Municipio';

export class Endereco {
  public id;
  public bairro = "" ;
  public cep = "" ;
  public rua = "" ;
  public complemento = "" ;

  public numero = "";
  public municipio = new Municipio();
}
