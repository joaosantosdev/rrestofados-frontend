import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../../../../services/UtilsService';
import {ClientService} from '../../../../../services/ClientService';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../../../core/utils';
import {ValidatorsHelper} from '../../../../../core/validators-helper';
import {Const} from '../../../../../core/const';
import {DialogAlert} from '../../../../../core/dialog-alert';

@Component({
  selector: 'cliente-form',
  templateUrl: './cliente-form.screen.html',
  styleUrls: ['./cliente-form.screen.css']
})
export class ClienteFormScreen implements OnInit {

  constructor(private router: Router,
              private builder: FormBuilder,
              private utilsService: UtilsService,
              private clientService: ClientService,
              private route: ActivatedRoute
  ) {
  }

  public title: String = 'Novo cliente';

  form: FormGroup;
  listaStatus = Const.listaStatus;
  listaEstados = [];
  listaMunicipios = [];
  loading = false;
  private idCliente = null;


  async ngOnInit() {
    this.idCliente = this.route.snapshot.params.id;
    if(this.idCliente){
      this.title = 'Atualização de cliente';
    }
    this.cleanForm();
    await this.utilsService.getEstados().then(response => {
      this.listaEstados = response.data;
    });
    if(this.idCliente){
      await this.clientService.getClientById(this.idCliente).then(async response=>{
        await this.onChangeEstado(response.data.endereco.estadoId);
        this.cleanForm(response.data);
        console.log(response.data.endereco.estadoId)
      }).catch(error=>{
        DialogAlert.info({message:error.error});
        this.router.navigate(['/clientes']);
      });
    }
  }

  public createTelefone(telefone = null) {
    return this.builder.group({
      numero: [telefone?telefone.numero:null, [Validators.required, ValidatorsHelper.noEmptyString]],
      descricao: [telefone?telefone.descricao:null, [Validators.required, ValidatorsHelper.noEmptyString]],
      whatsapp: [telefone?telefone.whatsapp:false, Validators.required]
    });
  }

  public getFormArrayTelefones(telefones= null) {
    return this.builder.array(telefones?telefones.map(telefone=>this.createTelefone(telefone)):[  this.createTelefone()]);
  }

  public cleanForm(cliente = null) {
    const endereco = cliente?cliente.endereco:null;
    this.form = this.builder.group({
      nome: [cliente ? cliente.nome : null, [Validators.required, ValidatorsHelper.noEmptyString]],
      email: [cliente ? cliente.email : null, [Validators.required, Validators.email, ValidatorsHelper.noEmptyString]],
      cpf: [cliente ? cliente.cpf : null],
      status: [cliente ? cliente.status : Const.status.ativo, Validators.required],
      endereco: this.builder.group({
        municipioId: [endereco? endereco.municipioId: null, Validators.required],
        estadoId: [endereco? endereco.estadoId: null, Validators.required],
        cep: [endereco? endereco.cep: null],
        bairro: [endereco? endereco.bairro: null, [Validators.required, ValidatorsHelper.noEmptyString]],
        rua: [endereco? endereco.rua: null, [Validators.required, ValidatorsHelper.noEmptyString]],
        numero: [endereco? endereco.numero: null, [Validators.required, ValidatorsHelper.noEmptyString]],
        complemento: [endereco? endereco.complemento: null, [Validators.required, ValidatorsHelper.noEmptyString]]
      }),
      telefones: this.getFormArrayTelefones(cliente?cliente.telefones:null)
    });
  }


  async salvar() {
    if (this.form.valid) {
      let response = null;
      if(this.idCliente){
        response = await this.clientService.updateClient(this.idCliente,this.form.value);
        DialogAlert.info({message:response.data});
      }else{
        response = await this.clientService.saveClient(this.form.value);
        DialogAlert.info({message:response.data});
        this.cleanForm();
      }

    } else {
      Utils.validateFields(this.form.controls);
      const endereco = this.form.controls.endereco as FormGroup;
      Utils.validateFields(endereco.controls);
      for (const i in this.telefonesArray.controls) {
        const group = this.telefonesArray.controls[i] as FormGroup;
        Utils.validateFields(group.controls);
      }
    }
  }

  onChangeWhatsapp(value, group) {
    group.controls.whatsapp.setValue(value);
  }


  getControl(name) {
    return this.form ? this.form.get(name) : null;
  }

  getControlEndereco(name) {
    return this.form ? this.form.controls.endereco.get(name) : null;
  }

  onChangeMunicipio(id) {
    const endereco = this.form.controls.endereco as FormGroup;
    endereco.controls.municipioId.setValue(id);
  }

  async onChangeEstado(id) {
    this.listaMunicipios = [];
    console.log(id)
    await this.utilsService.getMunicipios(id).then(response => {
      this.listaMunicipios = response.data;
    });
    const endereco = this.form.controls.endereco as FormGroup;
    endereco.controls.estadoId.setValue(id);
    endereco.controls.municipioId.setValue(null);
  }

  get telefonesArray() {
    return this.form.get('telefones') as FormArray;
  }

  addTelefone() {
    this.telefonesArray.push(this.createTelefone());
  }

  removeTelefone(index) {
    this.telefonesArray.removeAt(index);
  }

  onChangeStatus(value) {
    this.form.controls.status.setValue(value);
  }

  teste() {
    console.log(this.form.get('nome'));
  }
}
