import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
@Input()
paginator
  @Input()
  change
  constructor() { }

  ngOnInit(): void {
  }
  getLabel(i){
    return i+this.paginator.number;
  }
  getPage(){
    return this.paginator.number+1
  }
  disable(page){
    if(page > this.paginator.totalPages){
      return true
    }
    return false
  }
  changePage(page){
  if(page < 0){
    return;
  }

  console.log(this.paginator.last )
  if(this.paginator.last && page >= this.paginator.number){
    return;
  }
    this.change(page)
  }
}
