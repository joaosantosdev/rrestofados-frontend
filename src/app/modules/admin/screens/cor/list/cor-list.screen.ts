import {Utils} from './../../../../../core/utils';
import {DialogAlert} from '../../../../../core/dialog-alert';
import {Router} from '@angular/router';
import {Const} from './../../../../../core/const';
import {CorService} from './../../../../../services/CorService';
import {Component, OnInit} from '@angular/core';
import {Dialog} from 'src/app/components/dialog/dialog';

@Component({
  selector: 'app-cor-list',
  templateUrl: './cor-list.screen.html',
  styleUrls: []
})
export class CorListScreen implements OnInit {

  constructor(private corService: CorService, private router: Router, public dlFiltros: Dialog) {
  }
  public listaStatus = [{id: null, descricao: 'Todos'}, ...Const.listaStatus];
  public loading = false;
  listaCores: [];
  corEdit = null;
  public search = '';
  public searchFields: any = {};
  paginator = {
    page: 1,
    perPage: 6,
    totalCount: 0,
  };

  ngOnInit(): void {
    this.cleanFieldsSearch();
    this.pesquisarCores();
  }

  async pesquisarCores(params = {}) {
    this.listaCores = [];
    this.loading = true;
    const response = await this.corService.getCores({...this.paginator, ...params});
    this.paginator.totalCount = response.totalCount;
    this.listaCores = response.data;
    this.loading = false;
  }

  editarCor(cor) {
    this.router.navigate([`/cor/${cor.id}`]);

  }

  cleanFieldsSearch(){
    this.searchFields = {
      nome: '',
      descricao: '',
      hexadecimal: '',
      status: null
    };
  }

  async excluirCor(cor) {
    console.log('aqui', cor);
    const response = await DialogAlert.confirm({message: 'Deseja realmente excluir essa cor ?'});
    if (response) {
      cor.status = Const.status.excluido;
      await this.corService.updateCor(cor.id, cor).then(async response => {
        await this.pesquisarCores();
        DialogAlert.info({message: 'Cor excluída com sucesso.'});
      });
    }
  }

  clickNovaCor() {
    this.router.navigate([`/cor`]);
  }

  async changePage(page) {
    console.log(page);
    this.paginator.page = page;
    await this.pesquisarCores();
  }

  async pesquisar() {
    await this.pesquisarCores({
      search: JSON.stringify({nome: this.search})
    });
  }

  async dialogFiltros() {
    this.dlFiltros.open();
  }
  async pesquisarFiltros(){
    this.dlFiltros.close();
    await this.pesquisarCores({
      search: JSON.stringify({...this.searchFields, or: false})
    });

  }
  onChangeStatus(value) {
    this.searchFields.status = value;
  }


}
