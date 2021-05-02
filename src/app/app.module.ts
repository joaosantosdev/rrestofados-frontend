import {Dialog} from './components/dialog/dialog';
import {StatusPipe} from './pipes/StatusPipe';
import {CorService} from './services/CorService';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Service} from './services/Service';
import {ClientService} from './services/ClientService';
import {AdminModule} from './modules/admin/admin.module';
import {UtilsService} from './services/UtilsService';
import {TecidoService} from './services/TecidoService';
import UsuarioService from './services/UsuarioService';
import {FormsModule} from '@angular/forms';
import {FormaPagamentoService} from './services/FormaPagamentoService';
import {AuthGuard} from './auth/AuthGuard';
import {AuthInterceptor} from './auth/AuthInterceptor';
import {ServicoService} from './services/ServicoService';
import {SimNaoPipe} from './pipes/SimNaoPipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CardUserComponent } from './components/card-user/card-user.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AdminModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [ClientService, Service, UtilsService, TecidoService, UsuarioService, CorService, ServicoService, Dialog, FormaPagamentoService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
    exports: [
        StatusPipe
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
