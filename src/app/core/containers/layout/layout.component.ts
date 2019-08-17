import { Component, OnInit } from '@angular/core';
import {CoreState} from '../../store/reducers/feature.reducer';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {isAutenticated} from '../../store/selectors/auth.selectors';
import {signOut} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isUserAutenticated$: Observable<boolean>;
  login: any;

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    this.isUserAutenticated$ =  this.store.pipe(select(isAutenticated));
  }

  logout() {
    this.store.dispatch(signOut());
  }
}
