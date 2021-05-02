import {StatusPipe} from '../../pipes/StatusPipe';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardScreen} from './screens/dashboard/dashboard.screen';
import {AdminRouting} from './admin.routing';
import {LoginScreen} from './screens/login/login.screen';
import {ClienteFormScreen} from './screens/cliente/form/cliente-form.screen';
import {ClienteListScreen} from './screens/cliente/list/cliente-list.screen';
import {LoadingComponent} from 'src/app/components/loading/loading.component';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {InputContentComponent} from '../../components/input-content/input-content.component';
import {IconComponent} from '../../components/icon/icon.component';
import {MaskCepDirective} from '../../directives/mask-cep.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidEmailDirective} from '../../directives/valid-email.directive';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {CheckboxComponent} from '../../components/checkbox/checkbox.component';
import {CorFormScreen} from './screens/cor/form/cor-form.screen';
import {TecidoScreen} from './screens/tecido/tecido.screen';
import {PerfilScreen} from './screens/perfil/perfil.screen';
import {SelectSearchComponent} from 'src/app/components/select-search/select-search.component';
import {CorListScreen} from './screens/cor/list/cor-list.screen';
import {FormaPagamentoScreen} from './screens/forma-pagamento/forma-pagamento.screen';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {ServicoFormScreen} from './screens/servico/form/servico-form.screen';
import {InputDialogComponent} from '../../components/input-dialog/input-dialog.component';

import {NgxCurrencyModule} from 'ngx-currency';
import {ServicoListScreen} from './screens/servico/list/servico-list.screen';
import {SimNaoPipe} from '../../pipes/SimNaoPipe';
import {UsersScreen} from './screens/users/users.screen';
import {AppModule} from '../../app.module';
import {CardUserComponent} from '../../components/card-user/card-user.component';

@NgModule({
  declarations: [
    DashboardScreen,
    CardUserComponent,
    StatusPipe,
    SimNaoPipe,
    LoginScreen,
    IconComponent,
    LoadingComponent,
    InputDialogComponent,
    InputContentComponent,
    SelectSearchComponent,
    ModalComponent,
    ClienteFormScreen,
    ClienteListScreen,
    MaskCepDirective,
    ValidEmailDirective,
    DialogComponent,
    CheckboxComponent,
    PaginationComponent,
    CorFormScreen,
    TecidoScreen,
    PerfilScreen,
    CorListScreen,
    FormaPagamentoScreen,
    ServicoFormScreen,
    ServicoListScreen,
    UsersScreen
  ],
  imports: [
    CommonModule,
    AdminRouting,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],

  exports: [
    IconComponent,
    StatusPipe,
  ]
})
export class AdminModule {

}
