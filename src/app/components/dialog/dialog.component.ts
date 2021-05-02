import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'modal-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input()
  public name;
  @Input()
  public title;
  @Input()
  public ref;
  @Input()
  public alert;

  @Input()
  public classStyle;

  @Output()
  public onClose = new EventEmitter();

  constructor() {
  }


  getClass() {
    return this.classStyle ? this.classStyle : '';
  }

  close = (event = null) => {
    if (event && event.target.id !== this.name) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    document.getElementById(this.name).classList.remove('open-dialog');
    this.onClose.emit();
  }

  open = () => {
    document.getElementById(this.name).classList.add('open-dialog');
  }

  getAlert() {
    return this.alert ? 'alert' : '';
  }

  ngOnInit(): void {
    this.ref.name = this.name;
    this.ref.close = this.close;
    this.ref.open = this.open;
  }


}
