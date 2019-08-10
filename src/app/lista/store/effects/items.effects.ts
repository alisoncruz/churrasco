import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {updateItem, updateItemsList} from '../actions/item.actions';
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

  // updateItem = createEffect(() => this.actions$.pipe(
  //   ofType(updateItem),
  //   exhaustMap(action => from(this.fireStore.doc(`cards/${action.item.id}`).set(action.item)).pipe(
  //     concatMap(() => from([]))
  //     )
  //   ), {dispatch: false});

  updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(updateItem),
    exhaustMap((action) =>
      from(this.fireStore.doc(`items/${action.item.id}`).set(action.item)).pipe(
        concatMap(() => from([
          navigateTo({commands: ['core', 'layout', 'lista']}),
          showSnackBar({message: `${action.item.nome} updated`, config: {}})
        ])),
        catchError(() => of(showSnackBar({
          message: 'Ops, something goes wrong', config: {
            duration: 5000
          }
        })))
      )
    ),
  ));


  constructor(private fireStore: AngularFirestore, private actions$: Actions) {
  }

}
