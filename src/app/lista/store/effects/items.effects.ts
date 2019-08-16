import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {createItem, deleteItem, updateItem, updateItemsList} from '../actions/item.actions';
import {Item} from '../../model/item';
import {catchError, concatMap, exhaustMap, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {navigateTo} from '../../../store/actions/app.actions';
import {showSnackBar} from '../../../core/store/actions/core.actions';

@Injectable()
export class ItemsEffects {


  updateItemsList$ = createEffect(() => this.fireStore.collection<Item>('items').valueChanges().pipe(
    map(items => updateItemsList({items}))
  ));


  updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(updateItem),
    exhaustMap((action) =>
      from(this.fireStore.doc(`items/${action.item.id}`).set(action.item)).pipe(
        concatMap(() => from([
          navigateTo({commands: ['core', 'layout', 'lista']}),
          showSnackBar({message: `Item ${action.item.nome} atualizado`, config: {}})
        ])),
        catchError(() => of(showSnackBar({
          message: 'Ops, something goes wrong', config: {
            duration: 5000
          }
        })))
      )
    ),
  ));

  createItem$ = createEffect(() => this.actions$.pipe(
    ofType(createItem),
    exhaustMap((action) =>
      from(this.fireStore.doc(`items/${this.createId()}`).set({
          id: this.id,
          nome: action.item.nome,
          preco: action.item.preco
        }
      )).pipe(
        concatMap(() => from([
          navigateTo({commands: ['core', 'layout', 'lista']}),
          showSnackBar({message: `Item ${action.item.nome} criado`, config: {}})
        ])),
        catchError(() => of(showSnackBar({
          message: 'Ops, something goes wrong.', config: {
            duration: 5000
          }
        })))
      )
    ),
  ));

  deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(deleteItem),
    exhaustMap((action) =>
      from(this.fireStore.doc(`items/${action.id}`).delete()).pipe(
        concatMap(() => from([
          navigateTo({commands: ['core', 'layout', 'lista']}),
          showSnackBar({message: `Item excluído`, config: {}})
        ])),
        catchError(() => of(showSnackBar({
          message: 'Ops, something goes wrong.', config: {
            duration: 5000
          }
        })))
      )
    ),
  ));


  constructor(private fireStore: AngularFirestore, private actions$: Actions) {
  }

  id: string;

  private createId() {
    this.id = this.fireStore.createId();
    return this.id;
  }
}
