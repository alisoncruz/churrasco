import {createSelector} from '@ngrx/store';
import {getItemsState} from '../reducers/feature.reducer';
import {itemAdapter} from '../reducers/item.reducer';

export const getItemState = createSelector(
  getItemsState,
  state => state.items
);

export const getAllItems = createSelector(
  getItemState,
  state => itemAdapter.getSelectors().selectAll(state)
);

export const getSelectItem = createSelector(
  getItemState,
  state => state.item
);







