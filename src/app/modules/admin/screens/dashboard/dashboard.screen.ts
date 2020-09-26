import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.screen.html',
  styleUrls: ['./dashboard.screen.css']
})
export class DashboardScreen implements OnInit {

  itemsSidebar = [
    {
      title: 'Perfil',
      navigation: 'perfil',
      icon: 'perfil',
      first: true
    },
    {
      title: 'Clientes',
      navigation: '/clientes',
      icon: 'cliente',

    },
    {
      title: 'Servicos',
      navigation: 'servicos',
      icon: 'servico',
      first: true
    },
    {
      title: 'Fluxo de caixa',
      navigation: 'servicos',
      icon: 'fluxo_caixa',

    },
    {
      title: 'Relatório',
      navigation: 'servicos',
      icon: 'relatorio',

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

  ngOnInit(): void {
  }

}
