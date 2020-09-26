import { Component, OnInit } from '@angular/core';
import {Tecido} from '../../../../models/Tecido';
import {TecidoService} from '../../../../services/TecidoService';
import {ValidHelper} from '../../../../helpers/ValidHelper';
import {Dialog} from '../../../../components/dialog/dialog';
import {Paginator} from '../../../../models/Paginator';

@Component({
  selector: 'app-tecido',
  templateUrl: './tecido.screen.html',
  styleUrls: ['./tecido.screen.css']
})
export class TecidoScreen implements OnInit {

  constructor(private tecidoService:TecidoService) { }
  public isUpdate = false;
  public tecido;
  public tecidoDelete;
  public errors: any;
  public dialog = new Dialog();
  public dialogDelete = new Dialog();
  public title = '';
  public tecidos : Tecido[] = [];
  public paginator = new Paginator();
  limpar(){
    this.title = 'Novo tecido';
    this.errors = {nome:'',descricao:''};
    this.tecido = new Tecido();

  }
  async ngOnInit() {
    this.limpar();
    await this.getTecidos();
  }


async getTecidos(){
    await  this.tecidoService.getTecidos(this.paginator).then(data=>{
        this.paginator.map(data);
        this.tecidos = data.response.content;
    }).catch(data=>{

    })
}

   changePage = async (page) =>{
    this.paginator.page = page;
    await this.getTecidos();
  }

  openDelete(tecido){
    this.dialogDelete.open();
    this.tecidoDelete = tecido;
  }
  closeDelete(){
    this.dialogDelete.close();
  }
  edit(tecido){
    this.title='Editar tecido'
    this.tecido = {...tecido};
  }
  async pesquisar(){
    await this.getTecidos();
  }
  async deleteTecido(){
    await  this.tecidoService.deleteTecido(this.tecidoDelete.id).then(async data=>{
      this.paginator = new Paginator();
      await this.getTecidos();
    }).catch(data=>{

    })
  }
  async salvar(){
    this.errors = {
      nome: !this.tecido.nome?"Nome é obrigatório": false,
      descricao: !this.tecido.descricao?"Descricao é obrigatório": false

    }
    if(ValidHelper.isOk(this.errors)){
      const success = async (data) =>{
        this.dialog.title = 'Sucesso'
        this.dialog.message = data.response;
        this.dialog.open();
        this.limpar();
        this.paginator = new Paginator();
        await this.getTecidos();
      };
      const error = (data)=>{
        this.dialog.title = 'Erro'
        this.dialog.message = data.error;
        this.dialog.open();
      };
      if(this.tecido.id){
        await this.tecidoService.updateTecido(this.tecido.id,this.tecido).then(async data=>await success(data)).catch(data=> error(data))

      }else{
        await this.tecidoService.saveTecido(this.tecido).then(async data=>await success(data)).catch(data=> error(data))

      }
    }

  }

}
