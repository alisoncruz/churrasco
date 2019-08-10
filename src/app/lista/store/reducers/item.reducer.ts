import {Item} from '../../model/item';
import {Action, createReducer, on} from '@ngrx/store';
import {createItem, deleteItem, selectItem, unselectItem, updateItem, updateItemsList} from '../actions/item.actions';
import {createEntityAdapter, EntityState, Update} from '@ngrx/entity';

export const itemAdapter = createEntityAdapter<Item>(
  {sortComparer: (a: Item, b: Item) => a.nome.localeCompare(b.nome)}
);

export interface ItemState extends EntityState<Item> {
  item?: Item;
}

// const pog = [
//   {id: 1, nome: 'cerveja', preco: 5},
//   {id: 2, nome: 'carne', preco: 20},
//   {id: 3, nome: 'carvão', preco: 10},
//   {id: 4, nome: 'gelo', preco: 10}
// ];

// const initialState = itemAdapter.addAll(pog, itemAdapter.getInitialState());

const initialState = itemAdapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(updateItemsList, (state, {items}) => itemAdapter.addAll(items, state)),
  on(selectItem, (state, {item}) => ({...state, item})),
  on(unselectItem, updateItem, (state: ItemState) => {
    const {item, ...rest} = state;
    return rest;
  }),
  on(createItem, (state, {item}) => itemAdapter.addOne(item, state)),
  // on(updateItem, (state, {item}) => itemAdapter.updateOne({id: item.id, changes: item}, state)),
  on(deleteItem, (state, {id}) => itemAdapter.removeOne(id, state))
);

export function reducerItems(state: ItemState, action: Action) {
  return reducer(state, action);
}
