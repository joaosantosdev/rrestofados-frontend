import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { DashboardScreen } from './screens/dashboard/dashboard.screen'
import { LoginScreen } from './screens/login/login.screen'
import { ClienteNewScreen } from './screens/cliente/new/cliente-new.screen';
import { ClienteListScreen } from './screens/cliente/list/cliente-list.screen';
import {ClienteEditScreen} from './screens/cliente/edit/cliente-edit.screen';
import {AdministradorScreen} from './screens/administrador/administrador.screen';
import {TecidoScreen} from './screens/tecido/tecido.screen';
import {CorScreen} from './screens/cor/cor.screen';


const routes: Routes = [

    {
      path: 'login',
      component: LoginScreen,
  },
  {
    path: '',
    component: DashboardScreen,
    children:[
      {
        path: 'clientes',
        component: ClienteListScreen,

      },
      {
        path: 'clientes/novo',
        component: ClienteNewScreen,

      }
      ,
      {
        path: 'clientes/editar/:id',
        component: ClienteEditScreen,

      },
      {path:'tecidos',component:TecidoScreen},
      {path:'cores',component:CorScreen}

    ]

  },




];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting { }
