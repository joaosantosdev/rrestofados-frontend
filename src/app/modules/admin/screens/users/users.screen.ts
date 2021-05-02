import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../../core/utils';
import UsuarioService from '../../../../services/UsuarioService';
import {Dialog} from '../../../../components/dialog/dialog';
import {DialogAlert} from '../../../../core/dialog-alert';

@Component({
  selector: 'app-users',
  templateUrl: './users.screen.html',
  styleUrls: ['./users.screen.css']
})
export class UsersScreen implements OnInit {
  title = 'Usuários';
  form: FormGroup;
  code = null;
  public dlCode = new Dialog();
  messageCode = '';
  listUsers = [];

  constructor(
    private builder: FormBuilder,
    private userService: UsuarioService
  ) {

  }

  ngOnInit(): void {
    this.cleanForm();
    this.getUsers();

  }

  async getUsers() {
    const response: any = await this.userService.getUsers();
    this.listUsers = response.data;
  }

  cleanForm(): void {
    this.form = this.builder.group({
      email: [null, [Validators.required, Validators.email]],
      nome: [null, Validators.required],
      senha: ['', [Validators.required], this.validarSenha],
      rSenha: ['', [Validators.required], this.validarSenha]
    });
  }

  validarSenha = () => {
    const senha = this.form.get('senha').value;
    const rSenha = this.form.get('rSenha').value;
    const errors = this.form.controls.rSenha.errors;
    const equals = senha === rSenha;
    if (equals) {
      this.form.controls.senha.setErrors(null);
      this.form.controls.rSenha.setErrors(null);
    } else {
      this.form.controls.rSenha.setErrors({...errors, passwordDistinct: true});
    }
    return new Promise((resolve, reject) => equals ? resolve(true) : null);
  };

  salvar() {
    if (this.form.valid) {
      const body = this.form.value;
      delete body.rSenha;
      if (this.code) {
        body.code = this.code;
      }
      this.userService.createUser(body).then((response: any) => {
        if (response.verification) {
          this.dlCode.open();
          this.messageCode = response.verification;
          return;
        }
        this.dlCode.close();
        DialogAlert.success({message: response.data});
        this.code = null;
        this.cleanForm();
        this.getUsers();
      }).catch(response => {
        DialogAlert.error({message: response.error.error});
      });
      return;
    }
    Utils.validateFields(this.form.controls);
  }

  async changeStatus(id) {
    const response: any = await this.userService.updateStatus(id);
    if (response.error) {
      DialogAlert.error({message: response.error.error});
    } else {
      DialogAlert.error({message: response.data});
      this.getUsers();
    }
  }

  get usersGroup() {
    return Utils.arrayChunk(this.listUsers, 4);
  }

}
