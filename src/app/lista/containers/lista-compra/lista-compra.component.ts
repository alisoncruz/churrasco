import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../model/item';
import {Action, select, Store} from '@ngrx/store';
import {ItemState} from '../../store/reducers/item.reducer';

import {getAllItems} from '../../store/selectors/item.selectors';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.scss']
})
export class ListaCompraComponent implements OnInit {

  items$: Observable<Item[]>;

  constructor(private store: Store<ItemState>) {
  }

  ngOnInit() {
    this.items$ = this.store.pipe(select(getAllItems));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
