import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('sessionToken');
    if (token) {
      return true;
    } else {
      // Redirect to login if user is not authenticated
      return this.router.createUrlTree(['/login']);
    }
  }
}
