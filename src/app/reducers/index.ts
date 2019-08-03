import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {CustomSerializer, RouterStateUrl} from './custom-route-serializer';
import {Router} from '@angular/router';

export interface State {
 router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
