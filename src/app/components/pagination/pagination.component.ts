import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  paginator;

  @Output()
  change = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }


  next(): void {
    if (this.paginator.page < this.totalPages) {
      this.change.emit(this.paginator.page + 1);
    }
  }

  previous(): void {
    if (this.paginator.page > 1) {
      this.change.emit(this.paginator.page - 1);
    }
  }

  get totalPages() {
    return Math.ceil(this.paginator.totalCount / this.paginator.perPage);
  }

}
