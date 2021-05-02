import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'simNao'
})
export class SimNaoPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return value ? 'Sim' : 'Não';
  }

}
