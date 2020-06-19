import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { DashboardScreen } from './screens/dashboard/dashboard.screen'
import { LoginScreen } from './screens/login/login.screen'
import { NewClienteComponent } from './screens/cliente/new-cliente/new-cliente.component';
import { ClienteListScreen } from './screens/cliente/list/cliente-list.screen';


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
        path: 'cliente',
        component: ClienteListScreen,
    
      },
    
     
      
    ]

  },
  {
    path: 'cliente/novo',
    component: NewClienteComponent,

  }
  
  
   
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting { }