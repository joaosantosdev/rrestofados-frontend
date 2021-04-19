import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Const} from '../../../../core/const';
import {DialogAlert} from '../../../../core/dialog-alert';
import {FormaPagamentoService} from '../../../../services/FormaPagamentoService';

@Component({
  selector: 'forma-pagamento-screen',
  templateUrl: './forma-pagamento.screen.html',
  styleUrls: []
})
export class FormaPagamentoScreen implements OnInit {
  public listaStatus = Const.listaStatus;
  public isUpdate = false;
  public title = '';
  public loadingSave = false;
  public loading = false;

  public listaFormasPag: any = [];
  public form: FormGroup;

  public search = '';

  public paginator = {
    page: 1,
    perPage: 6,
    totalCount: 0,

  };

  constructor(private formaPagService: FormaPagamentoService, private builder: FormBuilder) {}


  cleanForm(formaPag = null) {
    this.title = 'Forma de Pagamento';
    this.form = this.builder.group({
      id: [formaPag ? formaPag.id : null],
      nome: [formaPag ? formaPag.nome : null, Validators.required],
      descricao: [formaPag ? formaPag.descricao : null, Validators.required],
      status: [formaPag ? formaPag.status : Const.status.ativo, Validators.required]
    });
  }

  async ngOnInit() {
    this.cleanForm();
    await this.getFormasPagamentos();
  }


  async getFormasPagamentos(params = {}) {
    this.loading = true;
    const response = await this.formaPagService.getFormasPagamentos({...this.paginator, ...params});
    this.listaFormasPag = response.data;
    this.paginator.totalCount = response.totalCount;
    this.loading = false;
  }

  async changePage(page) {
    this.paginator.page = page;
    await this.getFormasPagamentos();
  }


  edit(formaPag) {
    this.cleanForm(formaPag);
    this.title = 'Atualização de forma de pagamento';
  }

  async delete(formaPag) {
    if (this.form.controls.id.value) {
      return;
    }
    this.cleanForm();
    const response = await DialogAlert.confirm({message: 'Deseja realmente excluir essa forma de pagamento?'});
    if (response) {
      formaPag.status = Const.status.excluido;
      await this.formaPagService.updateFormaPagamento(formaPag.id, formaPag).then(data => {
        DialogAlert.info({message: 'Forma de pagamento excluída com sucesso.'});
        this.getFormasPagamentos();
      });
    }
  }

  async pesquisar() {
    await this.getFormasPagamentos({
      search: JSON.stringify({
          nome: this.search
      })});
  }

  async salvar() {
    if (this.loadingSave) {
      return;
    }
    if (this.form.valid) {
      const json = this.form.value;
      this.loadingSave = true;
      if (json.id) {
        await this.formaPagService.updateFormaPagamento(json.id, json).then(response => {
          DialogAlert.success({message: 'Forma de pagamento atualizada com sucesso.'});
        });
      } else {
        delete json.id;
        await this.formaPagService.saveFormaPagamento(json).then(response => {
          DialogAlert.success({message: 'Forma de pagamento cadastrada com sucesso.'});
        });
      }
      this.loadingSave = false;
      this.cleanForm();
      await this.getFormasPagamentos();
      this.search = '';
    } else {
      Object.keys(this.form.controls).map(key => {
        this.form.controls[key].markAsTouched();
        this.form.controls[key].markAsDirty();
      });
    }

  }

  getControl(name) {
    return this.form ? this.form.get(name) : null;
  }

  onChangeStatus(value) {
    this.form.controls.status.setValue(value);
  }
}
