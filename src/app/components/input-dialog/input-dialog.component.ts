import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  @Output()
  public onClick = new EventEmitter();

  @Input()
  public value = '';

  @Input()
  public disabled ;

  constructor() {
  }

  ngOnInit(): void {

  }


  click() {
    console.log(this.disabled)
    if (this.disabled) {
      return;
    }
    this.onClick.emit();
  }

}
