import {createAction, props} from '@ngrx/store';
import {Item} from '../../model/item';

export const updateItemsList = createAction(
  '[Items] Update Items List',
  props < {items: Item[]}>()
);

export const createItem = createAction(
  '[Items] Create Item.',
  props<{ item: Item }>()
);

export const updateItem = createAction(
  '[Items] Update Item.',
  props<{ item: Item }>()
);

export const deleteItem = createAction(
  '[Items] Delete Item.',
  props<{ id: string }>()
);

export const selectItem = createAction(
  '[Items] Select Item.',
  props<{ item: Item }>()
);

export const unselectItem = createAction(
  '[Items] Unselect Item.',
);


