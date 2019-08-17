import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {auth} from 'firebase/app';
import {EMPTY, from, of} from 'rxjs';
import {catchError, exhaustMap, map, mapTo, switchMapTo} from 'rxjs/operators';
import {signInEmail, signInGoogle, signOut, signOutSuccess, updateUserInfo} from '../actions/auth.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AngularFireAuth} from '@angular/fire/auth';
import {showSnackBar} from '../actions/core.actions';
import {navigateTo} from '../../../store/actions/app.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authFire: AngularFireAuth) {
  }

  updateUserInfo$ = createEffect(() => this.authFire.user.pipe(
    map(user => {
      if (user) {
        const {uid, displayName, email, phoneNumber, photoURL, providerId} = user;
        return updateUserInfo({user: {uid, displayName, email, phoneNumber, photoURL, providerId}});
      }
      return updateUserInfo({});
    })
  ));

  signInEmail$ = createEffect(() => this.actions$.pipe(
    ofType(signInEmail),
    exhaustMap(({email, password}) => from(this.authFire.auth.signInWithEmailAndPassword(email, password)).pipe(
      mapTo(navigateTo({commands: ['core']})),
      catchError((error: auth.Error) => of(showSnackBar({
        message: error.message,
        config: {
          duration: 5000
        }
      })))
    ))
  ));

  signInGoogle$ = createEffect(() => this.actions$.pipe(
    ofType(signInGoogle),
    exhaustMap(() => from(
      this.authFire.auth.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(
      mapTo(navigateTo({commands: ['core']})),
      catchError(() => of(showSnackBar({
        message: `Ops, cant sign in`, config: {
          duration: 5000
        }
      })))
    ))
  ));

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(signOut),
    exhaustMap(() => from(
      this.authFire.auth.signOut()
    ).pipe(
      mapTo(signOutSuccess())
    )),
  ));

  signOutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(signOutSuccess),
    mapTo(navigateTo({commands: ['core']}))
    )
  );
}
