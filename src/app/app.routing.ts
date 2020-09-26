import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { TesteComponent } from './screens/teste/teste.component';

const routes: Routes = [
  {path: "teste",component: TesteComponent},
  {path: "",loadChildren: () => import('./modules/admin/admin.module').then(m=>m.AdminModule)},

  {path: "admin",loadChildren: () => import('./modules/admin/admin.module').then(m=>m.AdminModule)},



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
