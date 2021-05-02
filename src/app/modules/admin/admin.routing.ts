import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router'; // CLI imports router
import {DashboardScreen} from './screens/dashboard/dashboard.screen';
import {LoginScreen} from './screens/login/login.screen';
import {ClienteListScreen} from './screens/cliente/list/cliente-list.screen';
import {TecidoScreen} from './screens/tecido/tecido.screen';
import {CorFormScreen} from './screens/cor/form/cor-form.screen';
import {PerfilScreen} from './screens/perfil/perfil.screen';
import {CorListScreen} from './screens/cor/list/cor-list.screen';
import {FormaPagamentoScreen} from './screens/forma-pagamento/forma-pagamento.screen';
import {ClienteFormScreen} from './screens/cliente/form/cliente-form.screen';
import {AuthGuard} from '../../auth/AuthGuard';
import {ServicoFormScreen} from './screens/servico/form/servico-form.screen';
import {ServicoListScreen} from './screens/servico/list/servico-list.screen';
import {UsersScreen} from './screens/users/users.screen';


const routes: Routes = [

  {
    path: 'login',
    component: LoginScreen,
  },
  {
    path: '',
    component: DashboardScreen,
    canActivate: [AuthGuard],
    children: [
      {path: 'perfil', component: PerfilScreen,},
      {path: 'clientes', component: ClienteListScreen,},
      {path: 'cliente', component: ClienteFormScreen,},
      {path: 'cliente/:id', component: ClienteFormScreen,},
      {path: 'forma/pagamento', component: FormaPagamentoScreen},
      {path: 'tecidos', component: TecidoScreen},
      {path: 'cores', component: CorListScreen},
      {path: 'cor', component: CorFormScreen},
      {path: 'cor/:id', component: CorFormScreen},
      {path: 'servico', component: ServicoFormScreen},
      {path: 'servico/:id', component: ServicoFormScreen},
      {path: 'servicos', component: ServicoListScreen},
      {path: 'usuarios', component: UsersScreen}


    ]

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting {
}
