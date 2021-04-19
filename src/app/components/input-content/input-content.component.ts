import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'input-content',
  templateUrl: './input-content.component.html',
  styleUrls: ['./input-content.component.css']
})
export class InputContentComponent implements OnInit {
  messagesErrors = {
    email: 'Email inválido',
    required: 'Campo obrigatorio',
    passwordDistinct: 'Senha incorreta'
  };
  @Input()
  public control;


  @Input()
  public opcional: boolean = false;

  @Input()
  public class;
  @Input()
  public label;

  constructor() {
  }

  @Input()
  public error;

  getError() {
    const errors = this.control.errors;
    if (errors) {
      const validators = ['required', 'email', 'passwordDistinct'];
      for (const v of validators) {
        if (errors[v]) {
          return this.messagesErrors[v];
        }
      }
    }
    return null;
  }

  ngOnInit(): void {

  }

  getControl() {
    return this.control ? this.control : {};
  }


}
