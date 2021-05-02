import {Component, OnInit} from '@angular/core';
import {ServicoService} from '../../../../../services/ServicoService';
import {Dialog} from '../../../../../components/dialog/dialog';
import {Const} from '../../../../../core/const';
import {CorService} from '../../../../../services/CorService';
import {TecidoService} from '../../../../../services/TecidoService';
import {FormaPagamentoService} from '../../../../../services/FormaPagamentoService';
import {DialogAlert} from '../../../../../core/dialog-alert';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsHelper} from '../../../../../core/validators-helper';
import {Utils} from '../../../../../core/utils';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.screen.html',
  styleUrls: ['./servico-list.screen.css']
})
export class ServicoListScreen implements OnInit {
  public listaStatus = [{id: null, descricao: 'Todos'}, ...Const.listaStatus];
  public listaSimNao = [{id: null, descricao: 'Todos'}, ...Const.listaSimNao];

  public servicos = [];
  public searchText = '';
  public params: any = {
    page: 1,
    perPage: 5,
    totalCount: 0,
    count: 0,
    search: {},
    or: false,
  };

  public servicoCancel = null;
  public formCancel: FormGroup;

  public filtersOld = {};

  public listaCores = [];
  public listaTecidos = [];

  public loading = false;
  public dlFiltros = new Dialog();
  public dlCancel = new Dialog();

  constructor(
    private servicoService: ServicoService,
    private corService: CorService,
    private tecidoService: TecidoService,
    private builder: FormBuilder
  ) {
  }

  async ngOnInit() {

    this.formCancel = this.builder.group({
      motivo: [null, [Validators.required, ValidatorsHelper.noEmptyString]]
    });

    this.searchServicos();
    let response = await this.corService.getCoresAll();
    this.listaCores = response.data;
    response = await this.tecidoService.getTecidosAll();
    this.listaTecidos = response.data;
  }

  async searchServicos() {
    this.servicos = [];
    this.loading = true;
    await this.servicoService.getServicosFilter({...this.params, search: JSON.stringify(this.params.search)}).then(response => {
      this.servicos = response.data;
      this.params.count = response.count;
      this.params.totalCount = response.totalCount;
    });
    this.loading = false;
  }

  changePage(page) {
    this.params.page = page;
    this.searchServicos();
  }

  clickSearchText() {
    this.params.page = 1;
    this.params.search = {status: null};
    if (this.searchText.trim() === '') {
      this.params.or = false;
    } else {
      ['nome', 'email', 'cpf'].forEach(key => {
        this.params.search[key] = this.searchText;
      });
      this.params.or = true;
    }
    this.searchServicos();
  }

  dialogFiltros() {
    console.log(this.dlCancel);
    this.dlFiltros.open();
  }

  onChangeStatus(key, value) {
    this.params.search[key] = value;

  }

  searchFilters() {
    this.params.page = 1;
    ['nome', 'email', 'cpf'].forEach(key => {
      delete this.params.search[key];
    });
    this.searchText = '';
    this.params.or = false;
    this.searchServicos();
    this.filtersOld = this.params.search;
    this.dlFiltros.close();
  }

  cleanFilters() {
    this.params.or = false;
    this.searchText = '';
    this.params.search = {status: null, cancelado: null};
  }


  closeFilter() {
    this.params.search = {...this.filtersOld};
  }

  openDlCancel(servico) {
    this.servicoCancel = servico;
    this.dlCancel.open();
  }

  public cancelar() {
    if (this.formCancel.valid) {
      this.servicoService.cancelServico(this.servicoCancel.id, {motivo: this.formCancel.get('motivo').value.trim()}).then(response => {
        DialogAlert.info({message: response.data});
        this.searchServicos();
        this.formCancel.reset();
        this.servicoCancel = null;
        this.dlCancel.close();
      }).catch((error: any) => {
        DialogAlert.info({message: error.error});
      });
    } else {
      Utils.validateFields(this.formCancel.controls);
    }
  }


}
