import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../model/item';
import {selectItem} from '../../store/actions/item.actions';


@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.scss']
})
export class CompraListComponent implements OnInit {

  @Input()
  items: Item[];

  @Output()
  actionEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  select(item: Item) {
    this.actionEmitter.emit(selectItem({item}));
  }

}
