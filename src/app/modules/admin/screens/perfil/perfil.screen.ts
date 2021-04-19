import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import UsuarioService from '../../../../services/UsuarioService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../../core/utils';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.screen.html',
  styleUrls: ['./perfil.screen.css']
})
export class PerfilScreen implements OnInit {
  @Output() emittedPost = new EventEmitter();

  form: FormGroup;
  foto;
  fotoExt;
  $foto;
  loading = false;
  usuario = null;

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
    this.foto = this.usuario.fotoBase64;
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
    console.log(fileList);
    if (fileList.length > 0) {
      this.fotoExt = fileList[0].type.split('/')[1];
      const reader = new FileReader();

      reader.onload = () => {
        this.foto = reader.result;
        console.log( this.foto )

      };
      reader.readAsDataURL(fileList[0]);
    }
  }

  removerFoto() {
    if (this.$foto) {
      this.$foto.value = null;
    }
    this.foto = null;
  }

  async salvar() {
    if (this.loading) {
      return;
    }

    if (this.form.valid) {
      const usuario = {...this.form.value};
      usuario.fotoBase64 = this.foto ? this.foto.split(',')[1] : this.foto;
      usuario.fotoExt =  this.fotoExt;
      if (usuario.senha !== '') {
        delete usuario.r_senha;
        usuario.senha = btoa(usuario.senha);
      } else {
        delete usuario.senha;
        delete usuario.r_senha;
      }
      this.loading = true;
      await this.usuarioService.updateUsuario(this.usuario.id, usuario).then(data => {
          Utils.setUsuario(data);
          this.form.get('senha').setValue('');
          this.form.get('r_senha').setValue('');
          this.loading = false;
      }).catch(error => {
        this.loading = false;

      });

    }
    Object.keys(this.form.controls).map(key => {
      this.form.controls[key].markAsDirty();
    });
  }
  get urlImage(){
    return Utils.geUserImageUrl(this.usuario.fotoPath)
  }
}
