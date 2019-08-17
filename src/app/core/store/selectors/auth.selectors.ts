import {createSelector} from '@ngrx/store';
import {getCoreState} from '../reducers/feature.reducer';

export const getAuthState = createSelector(
  getCoreState,
  state => state.auth
);

export const isAutenticated = createSelector(
  getAuthState,
  state => !!state.user
);

export const getAutenticatedUser = createSelector(
  getAuthState,
  state => state.user
);
