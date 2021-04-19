import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../../services/ClientService';
import {Router} from '@angular/router';
import {Cliente} from '../../../../../models/Cliente';
import {DialogAlert} from '../../../../../core/dialog-alert';

@Component({
  selector: 'cliente-list',
  templateUrl: './cliente-list.screen.html',
  styleUrls: ['./cliente-list.screen.css']
})
export class ClienteListScreen implements OnInit {
  public loading = false;
  title = 'sad';
  public searchText = '';
  public clients = [];
  public pagination: any = {
    page: 1,
    perPage: 5,
    count: 0,
    totalCount:0
  };
  public cliente = new Cliente();

  public clienteRemovido = null;

  constructor(public service: ClientService, public router: Router) {

  }


  async getClients(): Promise<void> {
    this.clients = [];
    this.loading = true;
    const response = await this.service.getClients(this.pagination);
    this.clients = response.data;
    this.pagination.count = response.count;
    this.pagination.totalCount = response.totalCount;
    this.loading = false;
  }


  async ngOnInit() {
    this.getClients();
  }

  public async getClientes() {
    this.loading = true;
  }

  changePage = (page) => {
    this.pagination.page = page;
    this.getClients();
  };

  pesquisar() {
    this.pagination.page = 1;
    this.getClients();
  }

  async deleteClient(id): Promise<void> {
    if (await DialogAlert.confirm({message: 'Deseja realmete excluir esse cliente?'})) {
        await this.service.deleteClientById(id).then(response => {
            DialogAlert.info({message: 'Cliente removido com sucesso.'});
            this.getClients();
      });
    }
  }

}
