import {Component, OnInit} from '@angular/core';
import {Tecido} from '../../../../models/Tecido';
import {TecidoService} from '../../../../services/TecidoService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Const} from '../../../../core/const';
import {DialogAlert} from '../../../../core/dialog-alert';

@Component({
  selector: 'app-tecido',
  templateUrl: './tecido.screen.html',
  styleUrls: []
})
export class TecidoScreen implements OnInit {
  public listaStatus = Const.listaStatus;
  public isUpdate = false;
  public title = '';
  public loadingSave = false;
  public loading = false;

  public listaTecidos: any = [];
  public form: FormGroup;

  public search = '';

  public paginator = {
    page: 1,
    perPage: 6,
    totalCount: 0,

  };

  constructor(private tecidoService: TecidoService, private builder: FormBuilder) {}


  cleanForm(tecido = null) {
    this.title = 'Tecido';
    this.form = this.builder.group({
      id: [tecido ? tecido.id : null],
      nome: [tecido ? tecido.nome : null, Validators.required],
      descricao: [tecido ? tecido.descricao : null, Validators.required],
      status: [tecido ? tecido.status : Const.status.ativo, Validators.required]
    });
  }

  async ngOnInit() {
    this.cleanForm();
    await this.getTecidos();
  }


  async getTecidos(params = {}) {
    this.loading = true;
    const response = await this.tecidoService.getTecidos({...this.paginator, ...params});
    this.listaTecidos = response.data;
    this.paginator.totalCount = response.totalCount;
    this.loading = false;
  }

  async changePage(page) {
    this.paginator.page = page;
    await this.getTecidos();
  }


  edit(tecido) {
    this.cleanForm(tecido);
    this.title = 'Atualização de tecido';
  }

  async delete(tecido) {
    if (this.form.controls.id.value) {
      return;
    }
    this.cleanForm();
    const response = await DialogAlert.confirm({message: 'Deseja realmente excluir esse tecido?'});
    if (response) {
      tecido.status = Const.status.excluido;
      await this.tecidoService.updateTecido(tecido.id, tecido).then(data => {
        DialogAlert.info({message: 'Tecido excluído com sucesso.'});
        this.getTecidos();
      });
    }
  }

  async pesquisar() {
    await this.getTecidos({
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
        await this.tecidoService.updateTecido(json.id, json).then(response => {
          DialogAlert.success({message: 'Tecido atualizado com sucesso.'});
        });
      } else {
        delete json.id;
        await this.tecidoService.saveTecido(json).then(response => {
          DialogAlert.success({message: 'Tecido cadastrado com sucesso.'});
        });
      }
      this.loadingSave = false;
      this.cleanForm();
      await this.getTecidos();
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
