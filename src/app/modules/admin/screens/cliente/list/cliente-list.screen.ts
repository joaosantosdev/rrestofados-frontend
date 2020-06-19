import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './cliente-list.screen.html',
  styleUrls: ['./cliente-list.screen.css']
})
export class ClienteListScreen implements OnInit {
  public loading : boolean = false;
  public clientes = [];
  constructor() { }

  

  ngOnInit(): void {
  }

  init(){
    this.clientes = [
      {

      }
    ]
  }

  pesquisar(){
    this.loading = true;
  }

  naoAchou(){
    this.loading = false;
  }

  achou(){
    this.loading = false;
    this.clientes = [
      {

      }
    ]
  }
}
