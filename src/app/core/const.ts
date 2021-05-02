export class Const {
  static listaStatus = [
    {descricao: 'Ativo', id: 1},
    {descricao: 'Inativo', id: 2},
  ];
  static status = {
    ativo: 1,
    inativo: 2,
    excluido: 3
  };
  static httpStatus = {
    unauthorized: 401
  };
  static listaSimNao = [
    {descricao: 'Sim', id: true},
    {descricao: 'Não', id: false},
  ];
}
