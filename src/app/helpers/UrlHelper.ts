import {Injectable} from '@angular/core';

@Injectable()
export class UrlHelper {
    public static formatParams(params){
      if (!params) {
        return '';
      }
      let retorno = '?';
      let i = 0;
      Object.keys(params).map(key => {
          if (i != 0){
              retorno += '&';
          }
          retorno += key + '=' + params[key];
          i++;
          return key;
        });
      return retorno;
    }
}
