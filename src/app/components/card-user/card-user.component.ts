import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utils} from '../../core/utils';
import UsuarioService from '../../services/UsuarioService';
import {DialogAlert} from '../../core/dialog-alert';
import {Const} from '../../core/const';

@Component({
  selector: 'card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {

  status = Const.status;
  @Input()
  user = null;

  @Output()
  onChangeStatus = new EventEmitter();

  constructor(
    private userService: UsuarioService
  ) {
  }

  ngOnInit(): void {
  }

  get urlImage() {
    return Utils.geUserImageUrl(this.user.image);
  }

  async changeStatus() {
    this.onChangeStatus.emit(this.user.id);
  }
}
