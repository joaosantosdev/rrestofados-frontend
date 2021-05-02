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
import {environment} from '../../../../../../environments/environment';

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
    count: 0,
    search: {}
  };
  searchText = '';
  cancelado = false;
  public loadingClient = false;
  public seletedClient: any = {};
  public form: FormGroup;
  public formEndereco: FormGroup;
  public subtotal = 0;
  public parcelas = 1;
  public idServico = null;
  public formPagamento: FormGroup;
  public dlImages = new Dialog();
  public listImages = [];
  public $foto = null;


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
    this.listImages.push(this.createImage());
    this.cleanForm();
    this.idServico = this.route.snapshot.params.id;
    if (this.idServico) {
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
        this.cancelado = data.cancelado;
        if (this.cancelado) {
          this.title = 'Serviço cancelado';
        }
        if (data.endereco) {
          await this.onChangeEstado(data.endereco.estadoId);
          await this.onChangeMunicipio(data.endereco.municipioId);
        }
        this.cleanForm(response.data);
        this.getImages();
      }).catch(error => {
        DialogAlert.info({message: error.error});
        this.router.navigate(['/servicos']);
      });
    }
  }

  async getImages(){
    await this.servicoService.getImages(this.idServico).then((resp: any) => {
      if (resp.data.length > 0) {
        this.listImages = resp.data.map(item => {
          delete item.image.id;
          return item;
        });
      }
      console.log(resp);
    }).catch(error => {
      DialogAlert.info({message: error.error});
    });
  }
  public cleanForm(servico = null) {
    const endereco = servico ? servico.endereco : null;
    const valorFrete = servico ? (servico.valorFrete || 0) : 0;
    this.seletedClient = servico ? servico.cliente : {};

    this.form = this.builder.group({
      data: [servico ? servico.data : null, [Validators.required]],
      descricao: [servico ? servico.descricao : null, [Validators.required]],
      observacao: [servico ? servico.observacao : null],
      materiaisUtilizados: [servico ? servico.materiaisUtilizados : null],
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
      valorTotal: [valorFrete + subtotal, [Validators.required]],
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
      if (this.pagamentosArray.length === 0) {
        return DialogAlert.info({message: `Informe pelo menos uma parcelas.`});
      }
      const valorTotal = this.valorTotal;
      const valorParcelas = this.pagamentosArray.controls.map(item => item.get('valor').value).reduce((v1, v2) => v1 + v2);
      if (valorTotal.toFixed(2) !== valorParcelas.toFixed(2)) {
        const passou = this.valorTotal < valorParcelas;
        const valor = passou ? valorParcelas - valorTotal : valorTotal - valorParcelas;
        return DialogAlert.info({message: `Valor total não corresponde com as parcelas. ${passou ? 'Passou' : 'Faltando'} R$ ${Utils.floatToCurrency(valor)}.`});
      }

      const json = this.form.value;
      if (this.formEndereco.value.municipioId !== 0) {
        json.endereco = this.formEndereco.value;
      }
      if (this.idServico) {
        this.servicoService.updateServico(this.idServico, json).then(response => {
          this.router.navigate([`/servicos`]);
          DialogAlert.info({message: response.data});
        });
      } else {
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
    const response = await this.clientService.getClients({...this.paginator, search: JSON.stringify(this.paginator.search)});
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
    console.log(this.valorTotal);
    this.formPagamento.get('valorTotal').setValue(this.valorTotal);
  }

  clickSearchClients() {
    this.paginator.page = 1;
    this.paginator.search = {};
    if (this.searchText.trim() !== '') {
      this.paginator.search['email'] = this.searchText;
      this.paginator.search['cpf'] = this.searchText;
      this.paginator.search['nome'] = this.searchText;
    }
    this.searchClients();
  }

  get url_report() {
    return `${environment.baseUrl}reports/servico/${this.idServico}?token=${Utils.getToken()}`;
  }

  clickImages() {
    this.dlImages.open();
  }

  get imagesGroup() {
    return Utils.arrayChunk(this.listImages, 2);
  }

  createImage() {
    return {
      descricao: null,
      image: {
        ext: null,
        base64: null
      }
    };
  }

  changeImage(position) {
    const changeImage = (event) => {
      this.$foto = event.target;
      const fileList = event.target.files;
      if (fileList.length > 0) {
        const ext = fileList[0].type.split('/')[1];
        const reader = new FileReader();
        reader.onload = () => {
          console.log( reader.result)
          this.listImages[position].image = {
            ...this.listImages[position].image,
            base64: reader.result,
            ext
          };
        };
        reader.readAsDataURL(fileList[0]);
      }
    };
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'jpg,png';
    input.addEventListener('change', changeImage);
    input.click();
  }

  addImage() {
    this.listImages.push(this.createImage());
  }

  removeImage(i) {
    this.listImages = this.listImages.filter((index, key) => key !== i);
  }

  salvarImages() {
    const images = [...this.listImages].filter(item => item.image.ext).map(item => {
      if (item.image.base64) {
        item.image.base64 = item.image.base64.split(',')[1];
      }
      return {...item};
    });
    this.dlImages.close();

    this.servicoService.saveImages(this.idServico, images).then(response => {
      this.getImages();
      DialogAlert.success({message: 'Imagens salvas com sucesso.'});
    }).catch(response => {
      DialogAlert.error({message: response.error.error});
    });
  }

  getUrlImage(image) {
    if (image.base64) {
      return image.base64;
    }
    return null;
  }
}
