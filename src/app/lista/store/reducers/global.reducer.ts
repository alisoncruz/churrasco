import {ItemState, reducerItems} from './item.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface ItemsState {
  items: ItemState;
}

export const itemReducer: ActionReducerMap<ItemsState> = {
  items: reducerItems
};

export const getItemsState = createFeatureSelector<ItemsState>(
  'item'
);
