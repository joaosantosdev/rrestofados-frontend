import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {ValidHelper} from '../helpers/ValidHelper';

@Directive(
  {
    selector:'[valid-email]'
  }
)
export class ValidEmailDirective {


  constructor(

    private ele: ElementRef
  ) { }


  ngOnInit() {



  }

}
