import {createAction, props} from '@ngrx/store';
import {MatSnackBarConfig} from '@angular/material';

export const showSnackBar = createAction(
  '[Core] Show Snack bar.',
  props<{ message, config: MatSnackBarConfig }>()
);
