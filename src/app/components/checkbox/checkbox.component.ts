import {Component, Input} from '@angular/core';

@Component(
  {
    selector:'checkbox',
    templateUrl:'./checkbox.component.html',
    styleUrls: ['./checkbox.component.css']

  }
)
export class CheckboxComponent{
  @Input()
  model
  @Input()
  name
  @Input()
  field
}
