import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() bg;
  @Input() size;
  @Input() status:boolean;
  @Input() showMessage:boolean;
  @Input() message;

  constructor() { }

  ngOnInit(): void {
  }

  getStyle(){
    let style = "";
    if(this.bg){
      style += "border-color: "+this.bg+" transparent transparent transparent;";
    }
    style += "height:"+this.size+";width:"+this.size+"";
    return style;
  }

 
}
