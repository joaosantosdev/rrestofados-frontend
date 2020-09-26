import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive(
  {
    selector:'[mask-cep]'
  }
)
export class MaskCepDirective {


  constructor(

    private elr: ElementRef
  ) { }
  public bloquearTeclas = (e)=>{

    const teclasPermitidas = [8,38,39,37,40];
    if(e.ctrlKey == false && !((e.which >= 48 && e.which <= 57) || teclasPermitidas.includes(e.which) )){
      e.stopPropagation()
      e.preventDefault()
      return;
    }
    if(e.which == 8){
      return;
    }
  }
  public formatarCep = (e) =>{
    if(e.which == 8){
      return;
    }
    let valorAnterior = this.elr.nativeElement.value
    let valorAnteriorSemMascara = valorAnterior.split(".").join("").split("-").join("")
    let sub = ''

    for(let i =0; i<valorAnteriorSemMascara.length; i++){
      if(i==0){
        sub +='$1'
      }else if(i == 2){
        sub += '.$2'
      }else if(i == 5){
        sub += '-$3'
      }

    }
    let novoValor= valorAnteriorSemMascara.replace(/(\d{2})?(\d{3})?(\d{3})?/,sub).slice(0,10)
    novoValor = novoValor.slice(0,10);
    console.log
    if(novoValor.length == 10 && novoValor != ''){
      this.elr.nativeElement.parentNode.classList.remove('error')

    }
    this.elr.nativeElement.value = novoValor
  }
  ngOnInit() {
    this.elr.nativeElement.maxLength=10
    this.elr.nativeElement.addEventListener('keydown',this.bloquearTeclas)
    this.elr.nativeElement.addEventListener('keyup',this.formatarCep)


    this.formatarCep({which:38});
  }

}
