import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { NbAuthService } from '../nebular-auth/services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.currentUserValue;

    if (user.role.includes(next.data.role)) {
      return true;
    }

    // navigate to not found page
    // this._router.navigate(['/404']);
    return false;
  }

}
