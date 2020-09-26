import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../../../../../services/ClienteService';
import {ActivatedRoute,Router} from '@angular/router'
import {Cliente} from '../../../../../models/Cliente';
@Component({
  selector: 'cliente-edit',
  templateUrl: './cliente-edit.screen.html',
  styleUrls: ['./cliente-edit.screen.css']
})
export class ClienteEditScreen implements OnInit {
  public cliente:Cliente;
  constructor(public service:ClienteService,public route:ActivatedRoute,public router:Router) { }

  async ngOnInit() {
   await this.searchClient()
  }
  async searchClient(){
    this.service.getCliente(this.route.snapshot.params.id).then(data=>{
      this.cliente = data.response;
    }).catch(err=>{
        this.router.navigate(['/admin/clientes'])
    })
  }
}
