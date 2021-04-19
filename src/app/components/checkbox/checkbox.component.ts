import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component(
  {
    selector: 'checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css']

  }
)
export class CheckboxComponent{
  _value = null;

  @Output()
  onChange = new EventEmitter();

  @Input()
  set value(v){
    this._value = v;
  }

  change(){
    this.value = !this._value;
    console.log(this._value);
    this.onChange.emit(this._value);
  }
}
