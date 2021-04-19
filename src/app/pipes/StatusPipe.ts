import { Const } from './../core/const';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const status = Const.listaStatus.filter(item => item.id === value);
    return status.length > 0 ? status[0].descricao : '';
  }

}
