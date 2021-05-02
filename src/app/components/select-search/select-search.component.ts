import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.css']
})
export class SelectSearchComponent implements OnInit {

  search = '';
  value = '';
  activeSearch = false;
  _options = [];

  @Input()
  disabled = false;

  @Input()
  set model(val: any) {
    this.value = val;
    this.callModel(val);
  }

  callModel(val){
    const item = this.options.filter(item => item[this.id] === val);
    if (item.length > 0){
      this.value = item[0][this.field];
      this.search = this.value;
    }else{
      this.search = '';
    }
  }

  @Output()
  modelChange = new EventEmitter();
  @Output()
  change = new EventEmitter();
  @Output()
  changeValue = new EventEmitter();

  @Input()
  set options(options){
    this._options = options;
    this.callModel(this.value);
  }
  get options(){
    return this._options;
  }


  optionsClone = [];
  @Input()
  field;

  @Input()
  id;



  isOpen = false;
  constructor() {
    document.addEventListener('click', (event) => {
      const element: any = event.target;
      let close = true;
      const classes = ['input-search', 'content-options', 'option', 'input-text-select-search', 'icon-select-search'];
      for (const _class of element.classList){
        if (classes.includes(_class)){
            close = false;
        }
      }

      if (close){
        this.isOpen = !close;

        this.activeSearch = false;
        this.search = this.value;
      }
    });

  }

  ngOnInit(): void {
    const item = this.options.filter(item => item[this.id] === this.model);

    if (item.length > 0){
      this.value = item[0][this.field];
      this.search = this.value;
    }
  }
  toggle(event){
    if(this.disabled){
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.isOpen = !this.isOpen ;
  }
  open(){
      this.isOpen = true;
  }
  onChange(item){
    this.model = item[this.id];
    this.value = item[this.field];
    this.search = this.value;
    this.activeSearch = false;
    this.isOpen = false;
    this.modelChange.emit(item[this.id]);
    this.change.emit(item[this.id]);
    this.changeValue.emit(item[this.id]);

  }
  getOptions(){
    if (this.activeSearch){
        return  this.options.filter(option => {
          const field: string = option[this.field];
          if (field.toLowerCase().includes(this.search.toLowerCase())){
            return true;
          }
          return false;
        });
    }
    return this.options;
  }
  onSearch(event){
    this.activeSearch = true;
  }
}
