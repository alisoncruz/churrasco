import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../model/item';
import {unselectItem, updateItem} from '../../store/actions/item.actions';
import {FormBuilder} from '@angular/forms';
import {Action} from "@ngrx/store";


@Component({
  selector: 'app-item-compra-detail',
  templateUrl: './item-compra-detail.component.html',
  styleUrls: ['./item-compra-detail.component.scss']
})
export class ItemCompraDetailComponent implements OnInit {


  constructor(private fb: FormBuilder) {
  }


  itemForm = this.fb.group({
    id: [''],
    nome: [''],
    preco: ['']
  });

  @Output()
  actionEmitter = new EventEmitter<Action>();

  @Input()
  set item(item: Item) {
    if (item) {
      this.itemForm.patchValue(item);
    }

  }


  ngOnInit() {
  }

  unselect() {
    this.actionEmitter.emit(unselectItem());
  }

  update() {
    this.actionEmitter.emit(updateItem({item: this.itemForm.value}));
  }
}
