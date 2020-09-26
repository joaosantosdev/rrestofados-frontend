import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing';
import { TesteComponent } from './screens/teste/teste.component';
import { HttpClientModule } from '@angular/common/http';
import {Service} from './services/Service';
import {ClienteService} from './services/ClienteService';
import {AdminModule} from './modules/admin/admin.module';
import {GlobalService} from './services/GlobalService';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {TecidoService} from './services/TecidoService';

@NgModule({
  declarations: [
    AppComponent,
    TesteComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    AdminModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [ClienteService, Service,GlobalService,TecidoService],
  exports: [


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
