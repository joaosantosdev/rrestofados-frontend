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
      navigation: '/admin/cliente',
      icon: 'cliente',
   
    },
    {
      title: 'Servicos',
      navigation: 'servicos',
      icon: 'servico',
      first: true
    },
    {
      title: 'Tecidos',
      navigation: 'tecido',
      icon: 'tecido'
    },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
