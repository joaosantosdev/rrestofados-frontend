import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  @Output()
  public click = new EventEmitter();

  @Input()
  public value = ''

  constructor() {
  }

  ngOnInit(): void {

  }


  onClick(){
    this.click.emit();
  }

}
