import {ActionReducerMap} from '@ngrx/store/src/models';
import {createFeatureSelector} from '@ngrx/store';
import {authReducer, AuthState} from './auth.reducer';

export interface CoreState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<CoreState> = {
  auth: authReducer
};

export const getCoreState = createFeatureSelector<CoreState>(
  'core'
)
