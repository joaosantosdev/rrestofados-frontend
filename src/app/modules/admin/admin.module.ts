import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardScreen } from './screens/dashboard/dashboard.screen';
import {AdminRouting} from './admin.routing';
import { LoginScreen } from './screens/login/login.screen'
import { IconComponent } from 'src/app/components/icon/icon.component';
import { NewClienteComponent } from './screens/cliente/new-cliente/new-cliente.component';
import { FormClienteComponent} from './screens/cliente/form-cliente/form-cliente.component';
import { ViewClienteComponent} from './screens/cliente/view-cliente/view-cliente.component';
import {ClienteListScreen} from './screens/cliente/list/cliente-list.screen';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';


@NgModule({
  declarations: [DashboardScreen, 
    LoginScreen,IconComponent,LoadingComponent,
    ModalComponent, FormClienteComponent, ViewClienteComponent, ClienteListScreen,
     NewClienteComponent],
  imports: [
    CommonModule,
    AdminRouting
    
  ],
  
})
export class AdminModule { }
