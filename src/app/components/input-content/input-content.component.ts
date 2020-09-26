import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-content',
  templateUrl: './input-content.component.html',
  styleUrls: ['./input-content.component.css']
})
export class InputContentComponent implements OnInit {
  @Input()
    public error;
  @Input()
  public opcional = false;
  @Input()
  public class;
  @Input()
  public label;
  constructor() { }

  ngOnInit(): void {
  }


}
