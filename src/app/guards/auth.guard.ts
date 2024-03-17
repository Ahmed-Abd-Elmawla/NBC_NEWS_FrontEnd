import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router,
    private cookieService: CookieService) {}

  canActivate(): Observable<boolean> {
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = this.cookieService.get('userId');
    return this.userService.getUserById(userId).pipe(
      map((data: any) => {
        if (data.role_id === 100) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}

