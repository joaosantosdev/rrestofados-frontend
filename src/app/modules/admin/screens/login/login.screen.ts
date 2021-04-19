import {Component, OnInit} from '@angular/core';
import UsuarioService from '../../../../services/UsuarioService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Utils} from '../../../../core/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.screen.html',
  styleUrls: ['./login.screen.css']
})
export class LoginScreen implements OnInit {

  usuario: FormGroup;
  error = null;

  constructor(private usuarioService: UsuarioService, private builder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.usuario = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  async entrar() {
    if (this.usuario.valid) {
      const usuario = {...this.usuario.value};
      await this.usuarioService.login(usuario).then((data: any) => {
        Utils.setToken(data.token);
        Utils.setUsuario(data.usuario);
        this.router.navigate(['/']);
      }).catch(data => {
        this.error = data.error.message;

      });
      return;
    }
    Object.keys(this.usuario.controls).map(key => {
      this.usuario.controls[key].markAsDirty();
    });

  }
}
