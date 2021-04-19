import {Component, OnInit} from '@angular/core';
import {Const} from '../../../../../core/const';
import {Dialog} from '../../../../../components/dialog/dialog';
import {ClientService} from '../../../../../services/ClientService';
import {CorService} from '../../../../../services/CorService';
import {TecidoService} from '../../../../../services/TecidoService';
import {UtilsService} from '../../../../../services/UtilsService';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsHelper} from '../../../../../core/validators-helper';
import {Utils} from '../../../../../core/utils';
import {FormaPagamentoService} from '../../../../../services/FormaPagamentoService';
import {ServicoService} from '../../../../../services/ServicoService';
import {DialogAlert} from '../../../../../core/dialog-alert';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servico-form-screen',
  templateUrl: './servico-form.screen.html',
  styleUrls: ['./servico-form.screen.css']
})
export class ServicoFormScreen implements OnInit {
  public title: String = 'Novo serviço';
  public listaStatus = Const.listaStatus;
  public listaClientes = [];
  public listaTecidos = [];
  public listaCores = [];
  public listaFormasPagamentos = [];
  public listaEstados = [];
  public listaMunicipios = [{nome: 'Nenhum', id: 0}];
  public paginator = {
    perPage: 5,
    totalCount: 0,
    page: 1,
    count: 0
  };
  public loadingClient = false;
  public seletedClient: any = {};
  public form: FormGroup;
  public formEndereco: FormGroup;
  public subtotal = 0;
  public parcelas = 1;
  public idServico = null;
  public formPagamento: FormGroup;


  constructor(public ctlDlCliente: Dialog,
              private builder: FormBuilder,
              private servicoService: ServicoService,
              private clientService: ClientService,
              private route: ActivatedRoute,
              private router: Router,
              private corService: CorService,
              private formaPagamentoService: FormaPagamentoService,
              private tecidoService: TecidoService,
              private utilsService: UtilsService) {
  }

  async ngOnInit() {
    this.cleanForm();
    this.idServico = this.route.snapshot.params.id;
    if(this.idServico){
      this.title = 'Atualização serviço';
    }

    let response = await this.corService.getCoresAll();
    this.listaCores = response.data;
    response = await this.tecidoService.getTecidosAll();
    this.listaTecidos = response.data;
    response = await this.utilsService.getEstados();
    this.listaEstados = [{nome: 'Nenhum', id: 0}].concat(response.data);
    response = await this.formaPagamentoService.getFormasPagamentosAll();
    this.listaFormasPagamentos = response.data;

    if (this.idServico) {

      await this.servicoService.getServicoById(this.idServico).then(async response => {
        const data = response.data;
        if (data.endereco) {
          await this.onChangeEstado(data.endereco.estadoId);
          await this.onChangeMunicipio(data.endereco.municipioId);
        }
        this.cleanForm(response.data);
      }).catch(error => {
        DialogAlert.info({message: error.error});
        this.router.navigate(['/servicos']);
      });
    }
  }

  public cleanForm(servico = null) {
    const endereco = servico ? servico.endereco : null;
    const valorFrete = servico ? (servico.valorFrete  || 0 ): 0;
    this.seletedClient = servico?servico.cliente:{};

    this.form = this.builder.group({
      data: [servico ? servico.data : null, [Validators.required]],
      descricao: [servico ? servico.descricao : null, [Validators.required]],
      dataEntrega: [servico ? servico.dataEntrega : null, [Validators.required]],
      tecidoId: [servico ? servico.tecidoId : null, Validators.required],
      corId: [servico ? servico.corId : null, Validators.required],
      clienteId: [servico ? servico.clienteId : null, Validators.required],
      status: [servico ? servico.status : Const.status.ativo, Validators.required],
      valorFrete: [valorFrete, Validators.required],
      pagamentos: this.getFormArrayPagamentos(servico ? servico.pagamentos : null)
    });
    this.formEndereco = this.builder.group({
      municipioId: [endereco ? endereco.municipioId : 0, Validators.required],
      estadoId: [endereco ? endereco.estadoId : 0, Validators.required],
      cep: [endereco ? endereco.cep : null],
      bairro: [endereco ? endereco.bairro : null, [Validators.required, ValidatorsHelper.noEmptyString]],
      rua: [endereco ? endereco.rua : null, [Validators.required, ValidatorsHelper.noEmptyString]],
      numero: [endereco ? endereco.numero : null, [Validators.required, ValidatorsHelper.noEmptyString]],
      complemento: [endereco ? endereco.complemento : null,],
    });
    const subtotal = servico ? servico.pagamentos.map(p => p.valor).reduce((v1, v2) => v1 + v2) : 0;
    this.formPagamento = this.builder.group({
      subtotal: [subtotal, [Validators.required]],
      valorTotal: [valorFrete+subtotal, [Validators.required]],
      parcelas: [servico ? servico.pagamentos.length : 0, [Validators.required]],
    });
  }

  public getFormArrayPagamentos(pagamentos = null) {
    return this.builder.array(pagamentos ? pagamentos.map(telefone => this.createPagamento(telefone)) : []);
  }

  public createPagamento(pagamento = null, defaultValue = 0) {
    console.log(pagamento);
    return this.builder.group({
      valor: [pagamento ? pagamento.valor : defaultValue, [Validators.required]],
      formaPagamentoId: [pagamento ? pagamento.formaPagamentoId : null, [Validators.required]],
      pago: [pagamento ? pagamento.pago : false, Validators.required]
    });
  }

  get pagamentosArray() {
    return this.form.get('pagamentos') as FormArray;
  }


  async salvar() {
    const valuesEndereco = Object.values(this.formEndereco.value).filter(v => v);
    if (this.form.valid && (valuesEndereco.length === 0 || this.formEndereco.valid)) {
      const json = this.form.value;
      if (this.formEndereco.value.municipioId !== 0) {
        json.endereco = this.formEndereco.value;
      }
      if(this.idServico){
        this.servicoService.updateServico( this.idServico, json).then(response => {
          this.router.navigate([`/servicos`]);
          DialogAlert.info({message: response.data});
        });
      }else{
        this.servicoService.saveServico(json).then(response => {
          DialogAlert.info({message: response.data.message});
          this.router.navigate([`/servico/${response.data.id}`]);
        });
      }

    } else {
      for (const i in this.pagamentosArray.controls) {
        const group = this.pagamentosArray.controls[i] as FormGroup;
        Utils.validateFields(group.controls);
      }
      Utils.validateFields(this.form.controls);
      if (valuesEndereco.length > 0) {
        Utils.validateFields(this.formEndereco.controls);
      } else {
        Utils.cleanValidate(this.formEndereco.controls);
      }
    }
  }

  public async openDialogClient() {
    await this.searchClients();
    this.ctlDlCliente.open();
  }

  public async searchClients() {
    const response = await this.clientService.getClients(this.paginator);
    this.listaClientes = response.data;
    this.paginator = {...this.paginator, ...response};
  }

  public async changePageClient(page) {
    this.listaClientes = [];
    this.paginator.page = page;
    this.loadingClient = true;
    await this.searchClients();
    this.loadingClient = false;
  }

  public clickClient(client) {
    this.seletedClient = client;
    this.form.controls.clienteId.setValue(client.id);
    this.ctlDlCliente.close();
  }

  async onChangeEstado(id) {
    this.listaMunicipios = [];
    console.log(id);
    this.formEndereco.controls.estadoId.setValue(id);
    this.formEndereco.controls.municipioId.setValue(null);

    if (id !== 0) {
      await this.utilsService.getMunicipios(id).then(response => {
        this.listaMunicipios = [{nome: 'Nenhum', id: 0}].concat(response.data);
      });
    }
  }

  onChangeMunicipio(id) {
    this.formEndereco.controls.municipioId.setValue(id);
  }

  onChangeCor(id) {
    this.form.controls.corId.setValue(id);
  }

  onChangeTecido(id) {
    this.form.controls.tecidoId.setValue(id);
  }

  onChangeFormaPagamento(id, group) {
    group.controls.formaPagamentoId.setValue(id);
  }

  getControl(name) {
    return this.form ? this.form.get(name) : null;
  }

  getControlEndereco(name) {
    return this.formEndereco ? this.formEndereco.get(name) : null;
  }

  onChangePago(value, group) {
    group.get('pago').setValue(value);
  }

  get valorTotal() {
    return this.formPagamento.get('subtotal').value + this.form.get('valorFrete').value;
  }

  changeParcelas(event) {
    const parcelas = parseInt(event.target.value);
    this.pagamentosArray.clear();
    const valorTotal = this.valorTotal;
    for (let i = 0; i < parcelas; i++) {
      this.pagamentosArray.push(this.createPagamento(null, valorTotal / parcelas));
    }

  }

  changeValorTotal() {
    console.log(this.valorTotal)
    this.formPagamento.get('valorTotal').setValue(this.valorTotal);
  }
}
