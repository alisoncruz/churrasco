import {Injectable} from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, take, tap} from 'rxjs/operators';
import {useAnimation} from '@angular/animations';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private authFire: AngularFireAuth, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.isAuthenticated();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isAuthenticated();
  }

  isAuthenticated(): Observable<boolean>{
    return this.authFire.user.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['core', 'layout', 'login']).then();
        }
        return !!user;
      }),
      take(1)
    );
  }
}
