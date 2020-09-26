import {Component, Input, OnInit} from '@angular/core';
import {Dialog} from '../../../../../components/dialog/dialog';
import {GlobalService} from '../../../../../services/GlobalService';
import {Cliente} from '../../../../../models/Cliente';
import {Telefone} from '../../../../../models/Telefone';
import {ValidHelper} from '../../../../../helpers/ValidHelper';
import {ClienteService} from '../../../../../services/ClienteService';
import {Router} from '@angular/router';

@Component({
  selector: 'cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  constructor(private router:Router,private globalService:GlobalService,private clienteService:ClienteService
  ) { }
  @Input()
  public title = 'Novo cliente';
  @Input()
  cliente;
  @Input()
  update
  estados = []
  municipios;
  errors:any;
  async ngOnInit() {
    console.log(this.cliente)
    this.limparForm();
    if(this.update){
      await this.getMunicipios()
    }
    await this.getEstados()


  }

  public limparForm(){

    if(!this.update){
      this.cliente = new Cliente()
      this.addTelefone()
    }
    this.municipios = []
    this.errors = {}
    this.errors['telefones'] = {}

  }
  public dialogMunicipio:Dialog = new Dialog();
  public dialogEstado:Dialog = new Dialog();
  public dialogSucesso:Dialog = new Dialog();


  public paginacao = {
    page:0,
    size:10,
    nome: ""
  }

  loadingMunicipio = false;




  addTelefone(){

    this.cliente.telefones.push(new Telefone())
  }
  exibirAddTelefone(key){
    let k = parseInt(key);
    return ((k+1) == this.cliente.telefones.length)
  }
  removerTelefone(key: any){
    this.cliente.telefones = this.cliente.telefones.filter((item,k)=>{
        if(k == key){
            return false
        }
        return  true;
    })

  }
  public selecionarMunicipo(municipio){
    console.log(municipio)
    this.cliente.endereco.municipio = municipio
    this.dialogMunicipio.close();
  }
  public selecionarEstado(estado){
    console.log(estado)
    this.cliente.endereco.municipio.nome = ""
    this.cliente.endereco.municipio.id = null;
    this.cliente.endereco.municipio.estado = estado;
    this.dialogEstado.close()
    this.getMunicipios();
  }


  public async getEstados(){
    await this.globalService.getEstados().then((data)=>{
      this.estados = data.response;
    });
  }
  public async getMunicipios(){
    this.loadingMunicipio = true;
    await this.globalService.getMunicipios(this.cliente.endereco.municipio.estado.id,
      this.paginacao).then((data)=>{
      this.municipios = data.response.content;
      this.loadingMunicipio = false;
    });
  }
  public async salvar(){

    this.errors = {
      email:!ValidHelper.validarEmail(this.cliente.email)?"Email invalido":false,
      cep:!ValidHelper.cep(this.cliente.endereco.cep) && this.cliente.endereco.cep?"CEP é invalido":false,
      nome:!this.cliente.nome? "Nome é obrigatorio" : false,
      estado:!this.cliente.endereco.municipio.estado.id? "Estado é obrigatorio" : false,
      municipio:!this.cliente.endereco.municipio.id? "Municipio é obrigatorio" : false,
      bairro:!this.cliente.endereco.bairro? "Bairro é obrigatorio" : false,
      rua:!this.cliente.endereco.bairro? "Rua é obrigatorio" : false,
      numero:!this.cliente.endereco.bairro? "Número é obrigatorio" : false,

    };
    this.errors['telefones'] = {}
    this.cliente.telefones.map((e,key)=>{
      if(!e.numero){
        this.errors['telefones'][key] = "Telefone é obrigatorio";
      }else{
        this.errors['telefones'][key] = false;
      }
    })

    if(ValidHelper.isOk(this.errors) && ValidHelper.isOk(this.errors.telefones)){

        if(this.update){
          this.dialogSucesso.open();
          await this.clienteService.updateCliente(this.cliente.id,this.cliente).then(data=>{

            this.router.navigate(['admin/clientes'])
          }).catch(error=>{

          })
        }else{
          await this.clienteService.saveCliente(this.cliente).then(data=>{
            this.dialogSucesso.open();
            this.limparForm()
          }).catch(error=>{

          })
        }
    }

  }

}
