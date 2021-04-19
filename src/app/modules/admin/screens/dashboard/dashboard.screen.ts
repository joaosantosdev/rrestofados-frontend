import { Component, OnInit } from '@angular/core';
import {DashboardState} from './state';
import {environment} from '../../../../../environments/environment';
import {Utils} from '../../../../core/utils';


@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.screen.html',
  styleUrls: ['./dashboard.screen.css']
})
export class DashboardScreen implements OnInit {

  itemsSidebar = [

    {
      title: 'Home',
      navigation: '/',
      icon: 'perfil',
      first: true
    },
    {
      title: 'Perfil',
      navigation: '/perfil',
      icon: 'perfil',
    },
    {
      title: 'Clientes',
      navigation: '/clientes',
      icon: 'cliente',

    },
    {
      title: 'Serviços',
      navigation: '/servicos',
      icon: 'servico',
    },
    {
      title: 'Formas de pagamento',
      navigation: '/forma/pagamento',
      icon: 'forma_pagamento'
    },
    {
      title: 'Tecidos',
      navigation: '/tecidos',
      icon: 'tecido'
    },
    {
      title: 'Cores',
      navigation: '/cores',
      icon: 'cor'
    },

  ];
  constructor() { }
  get usuario(): any{
    return DashboardState.getUsuario();
  }
  ngOnInit(): void {
  }

  get urlImage(){
      return Utils.geUserImageUrl(this.usuario.fotoPath)
  }

}
