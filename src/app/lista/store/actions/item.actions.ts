import {createAction, props} from '@ngrx/store';
import {Item} from '../../model/item';

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
  props<{ id: number }>()
);

export const selectItem = createAction(
  '[Items] Select Item.',
  props<{ item: Item }>()
);

export const unselectItem = createAction(
  '[Items] Unselect Item.',
  props<{ item: Item }>()
);
