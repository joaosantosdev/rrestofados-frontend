import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input() name: String;
  @Input() class : String;

  @Input() size: String;

  constructor() { }

  ngOnInit(): void {
  }

  getSize(){
    return "height:"+this.size+";width:"+this.size+";"
  }

}
