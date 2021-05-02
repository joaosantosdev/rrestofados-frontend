import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import UsuarioService from '../../../../services/UsuarioService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../../core/utils';
import {Dialog} from '../../../../components/dialog/dialog';
import {DialogAlert} from '../../../../core/dialog-alert';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.screen.html',
  styleUrls: ['./perfil.screen.css']
})
export class PerfilScreen implements OnInit {
  @Output() emittedPost = new EventEmitter();

  form: FormGroup;
  base64;
  fotoExt;
  $foto;
  loading = false;
  usuario = null;
  image = null;
  const;
  code = null;
  public dlCode = new Dialog();
  messageCode = '';

  getControl(name) {
    return this.form ? this.form.get(name) : null;
  }

  constructor(private usuarioService: UsuarioService, private builder: FormBuilder) {
    this.form = this.builder.group({
      email: [],
      senha: [],
      r_senha: [],
      nome: []
    });
  }

  validarSenha = () => {
    const senha = this.form.get('senha').value;
    const r_senha = this.form.get('r_senha').value;
    const errors = this.form.controls.r_senha.errors;
    const equals = senha === r_senha;
    if (equals) {
      this.form.controls.senha.setErrors(null);
      this.form.controls.r_senha.setErrors(null);
    } else {
      this.form.controls.r_senha.setErrors({...errors, passwordDistinct: true});
    }
    return new Promise((resolve, reject) => equals ? resolve(true) : null);
  }

  async ngOnInit() {
    this.usuario = await this.usuarioService.getUsuarioLogado();
    this.image = this.usuario.image;
    this.form = this.builder.group({
      email: [this.usuario.email, [Validators.required, Validators.email]],
      nome: [this.usuario.nome, Validators.required],
      senha: ['', [], this.validarSenha],
      r_senha: ['', [], this.validarSenha]
    });

  }

  changeFoto(event) {
    this.$foto = event.target;
    const fileList = event.target.files;
    if (fileList.length > 0) {
      this.fotoExt = fileList[0].type.split('/')[1];
      const reader = new FileReader();
      reader.onload = () => {
        this.base64 = reader.result;
      };
      reader.readAsDataURL(fileList[0]);
    }
  }

  removerFoto() {
    if (this.$foto) {
      this.$foto.value = null;
    }
    this.base64 = null;
    this.image = null;
  }

  async salvar() {
    if (this.loading) {
      return;
    }

    if (this.form.valid) {
      const usuario = {...this.form.value};
      let image = this.image;

      if (usuario.senha !== '') {
        delete usuario.r_senha;
        usuario.senha = btoa(usuario.senha);
      } else {
        delete usuario.senha;
        delete usuario.r_senha;
      }
      if (!image && this.base64) {
        image = {};
      }
      if (this.base64) {
        image.base64 = this.base64.split(',')[1];
        image.ext = this.fotoExt;
      }
      this.loading = true;
      usuario.image = image;
      if (this.code) {
        usuario.code = this.code;
      }
      await this.usuarioService.updateUsuario(usuario).then((data: any) => {
        if (data.verification) {
          this.messageCode = data.verification;
          this.dlCode.open();
          return;
        }

        Utils.setUsuario(data);
        this.removerFoto();
        this.form.get('senha').setValue('');
        this.form.get('r_senha').setValue('');
        this.image = data.image;
        this.dlCode.close();
        this.code = null;
        DialogAlert.info({message: 'Usuário atualizado com sucesso.'});
      }).catch(response => {
        DialogAlert.error({message: response.error.error});
      });
      this.loading = false;

    }
    Object.keys(this.form.controls).map(key => {
      this.form.controls[key].markAsDirty();
    });
  }

  get urlImage() {
    return Utils.geUserImageUrl(this.image);
  }
}
