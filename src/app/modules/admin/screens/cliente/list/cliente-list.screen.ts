import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../../../../../services/ClienteService';
import {Router} from '@angular/router';
import {Dialog} from '../../../../../components/dialog/dialog';
import {Cliente} from '../../../../../models/Cliente';

@Component({
  selector: 'cliente-list',
  templateUrl: './cliente-list.screen.html',
  styleUrls: ['./cliente-list.screen.css']
})
export class ClienteListScreen implements OnInit {
  public loading : boolean = false;
  public clientes = [];
  public paginacao:any = {
    page:0,
    size:10,
    number:0,
    search:""
  }
  public cliente = new Cliente();
  public dialogExcluir= new Dialog();
  public dialogConfirmar = new Dialog();
  public dialogEndereco  = new Dialog();
  public dialogTelefone  = new Dialog();

  public clienteRemovido = null;
  constructor(public service: ClienteService,public router:Router) {

  }



async  ngOnInit() {
  this.getClientes()

  }

  public async getClientes(){
    this.loading = true;

    await  this.service.getClientes(this.paginacao).then(data=>{
      this.paginacao.size = data.response.size;
      this.paginacao.last = data.response.last;
      this.paginacao.first = data.response.first;
      this.paginacao.number = data.response.number;
      this.paginacao.totalPages = data.response.totalPages;

      this.clientes =  data.response.content;
      this.loading = false;
  }) ;

  }



   changePage = (page) =>{
    this.paginacao.page = page;
    this.getClientes()
  }

  pesquisar(){
    this.paginacao.page = 0;
    this.getClientes()
  }


  openDelete(cliente){
    this.dialogExcluir.open();
    this.clienteRemovido = cliente;
  }
  closeDelete(){
    this.dialogExcluir.close();
  }
  async deleteCliente(){
    await this.service.deleteCliente(this.clienteRemovido.id).then(async res=>{
        this.dialogExcluir.close()
        await this.getClientes()
        this.dialogConfirmar.open();
    }).catch(err=>{

    })
  }
  openDialogEndereco(cliente){
    this.cliente = cliente;
    this.dialogEndereco.open();
  }


  openDialogTelefone(cliente){
    this.cliente = cliente;
    console.log(cliente,"cliente")
    this.dialogTelefone.open();
  }

}
