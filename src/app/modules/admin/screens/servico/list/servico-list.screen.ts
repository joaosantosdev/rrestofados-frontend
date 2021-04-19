import {Component, OnInit} from '@angular/core';
import {ServicoService} from '../../../../../services/ServicoService';
import {Dialog} from '../../../../../components/dialog/dialog';
import {Const} from '../../../../../core/const';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.screen.html',
  styleUrls: ['./servico-list.screen.css']
})
export class ServicoListScreen implements OnInit {
  public listaStatus = [{id: null, descricao: 'Todos'}, ...Const.listaStatus];

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
  public loading = false;

  constructor(
    private servicoService: ServicoService,
    public dlFiltros: Dialog
  ) {
  }

  ngOnInit(): void {
    this.searchServicos();
  }

  async searchServicos() {
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
    if (this.searchText.trim() === '') {
      this.params.search = {};
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
    this.dlFiltros.open();
  }
  onChangeStatus(value){
    this.params.search.status = value;
  }

}
