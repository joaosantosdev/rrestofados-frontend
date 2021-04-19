import {Router, ActivatedRoute} from '@angular/router';
import {CorService} from '../../../../../services/CorService';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Const} from '../../../../../core/const';
import {Component, OnInit} from '@angular/core';
import {core} from '@angular/compiler';
import {DialogAlert} from 'src/app/core/dialog-alert';

@Component({
  selector: 'app-cor',
  templateUrl: './cor-form.screen.html',
  styleUrls: []
})
export class CorFormScreen implements OnInit {

  listaStatus = Const.listaStatus;
  loading = false;
  form: FormGroup;
  public title = 'Cadastro de Cor';


  constructor(private builder: FormBuilder, private corService: CorService, private router: Router, private route: ActivatedRoute) {

  }

  async ngOnInit() {

    this.cleanForm();
    const id = this.route.snapshot.params.id;
    if (id) {
      this.title = 'Atualizacao de Cor';
      await this.corService.getCor(id).then(cor => {
        this.cleanForm(cor);
      });
    }

  }

  cleanForm(cor = null) {
    this.form = this.builder.group({
      id: [cor ? cor.id : null],
      nome: [cor ? cor.nome : null, Validators.required],
      descricao: [cor ? cor.descricao : null],
      hexadecimal: [cor ? cor.hexadecimal : null],
      status: [cor ? cor.status : Const.status.ativo, Validators.required]
    });
    console.log(this.form);
  }

  onChangeStatus(value) {
    this.form.controls.status.setValue(value);
  }


  async salvar() {
    if (this.loading) {
      return;
    }
    if (this.form.valid) {
      const json = this.form.value;
      this.loading = true;
      if (json.id) {
        await this.corService.updateCor(json.id, json).then(response => {
          DialogAlert.success({message: 'Cor atualizada com sucesso.'});
        });
      } else {
        delete json.id;
        await this.corService.saveCor(json).then(response => {
          DialogAlert.success({message: 'Cor cadastrada com sucesso.'});
        });
      }
      this.router.navigate(['/cores']);
      this.loading = false;
      this.cleanForm();
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


}
