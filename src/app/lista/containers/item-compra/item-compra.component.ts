import { Component, OnInit } from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {ItemState} from '../../store/reducers/item.reducer';
import {Observable} from 'rxjs';
import {Item} from '../../model/item';
import {getSelectItem} from '../../store/selectors/item.selectors';

@Component({
  selector: 'app-item-compra',
  templateUrl: './item-compra.component.html',
  styleUrls: ['./item-compra.component.scss']
})
export class ItemCompraComponent implements OnInit {

  item$: Observable<Item>;

  constructor(private store: Store<ItemState>) { }

  ngOnInit() {
    this.item$ = this.store.pipe(select(getSelectItem));

  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
