import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardScreen } from './screens/dashboard/dashboard.screen';
import {AdminRouting} from './admin.routing';
import { LoginScreen } from './screens/login/login.screen'
import { ClienteNewScreen } from './screens/cliente/new/cliente-new.screen';
import { ClienteFormComponent} from './screens/cliente/form/cliente-form.component';
import {ClienteEditScreen} from './screens/cliente/edit/cliente-edit.screen';
import {ClienteListScreen} from './screens/cliente/list/cliente-list.screen';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import {InputContentComponent} from '../../components/input-content/input-content.component';
import {IconComponent} from '../../components/icon/icon.component';
import {MaskCepDirective} from '../../directives/mask-cep.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidEmailDirective} from '../../directives/valid-email.directive';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {CheckboxComponent} from '../../components/checkbox/checkbox.component';
import {AppModule} from '../../app.module';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import { AdministradorScreen } from './screens/administrador/administrador.screen';
import { CorScreen } from './screens/cor/cor.screen';
import { TecidoScreen } from './screens/tecido/tecido.screen';


@NgModule({
  declarations: [DashboardScreen,
    LoginScreen, IconComponent, LoadingComponent, InputContentComponent,
    ModalComponent, ClienteFormComponent, ClienteEditScreen, ClienteListScreen,
    ClienteNewScreen, MaskCepDirective, ValidEmailDirective,    DialogComponent,CheckboxComponent,PaginationComponent, AdministradorScreen, CorScreen, TecidoScreen],
  imports: [
    CommonModule,
    AdminRouting,
    FormsModule,
    ReactiveFormsModule,

  ],

  exports: [
    IconComponent
  ]
})
export class AdminModule { }
