import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Action, Store} from '@ngrx/store';
import {CoreState} from '../../store/reducers/feature.reducer';
import {signInEmail, signInGoogle, signOut} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],

  });

  constructor(private fb: FormBuilder, private store: Store<CoreState>) {
  }

  ngOnInit() {
  }

  @Output()
  actionEmitter = new EventEmitter<Action>();

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(signInEmail(this.loginForm.value));
    }
  }

  google() {
    this.store.dispatch(signInGoogle());
  }

}
