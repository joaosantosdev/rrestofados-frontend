import {environment} from '../../environments/environment';

export class Utils {
  static setUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  static getUsuario() {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      return usuario;
    } catch (e) {
      return {};
    }
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static deleteToken() {
    localStorage.removeItem('token');
  }

  static fieldsSearch(fields, search) {
    const response = {};
    if (Array.isArray(fields)) {
      fields.forEach(key => {
        response[key] = search;
      });
    }
    return response;
  }

  static validateFields(controls) {
    Object.keys(controls).map(key => {
      controls[key].markAsTouched();
      controls[key].markAsDirty();
    });
  }

  static cleanValidate(controls) {
    Object.keys(controls).map(key => {
      controls[key].markAsUntouched();
      controls[key].markAsPristine();
    });
  }

  static geUserImageUrl(image): string {
    return image ? `${environment.baseUrl}assets/images?path=usuarios/${`${image.name}.${image.ext}`}` : '../../../../../assets/imgs/perfil_default.svg';
  }
  static geServiceImageUrl(image): string {
    return image ? `${environment.baseUrl}assets/images?path=servicos/${`${image.name}.${image.ext}`}` : null;
  }
  static floatToCurrency(float) {
    return parseFloat(float).toLocaleString('pt-br', {minimumFractionDigits: 2});
  }

  static arrayChunk(array, chunk) {
    const j = array.length;

    const temparray = [];
    for (let i = 0; i < j; i += chunk) {
      temparray.push(array.slice(i, i + chunk));
    }
    return temparray;
  }
}
