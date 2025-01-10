import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly cookieName = 'user_logged_in';

  constructor(
    private readonly _cookieService: CookieService,
    private readonly _router: Router,
  ) {}

  logIn(isRemember: boolean): void {
    this._cookieService.set(this.cookieName, 'true', {
      expires: isRemember ? 400 : 5, // Дней
      sameSite: 'Lax',
      path: '/',
      secure: true,
    });

    this._router.navigate(['home']);
  }

  logOut(): void {
    this._cookieService.delete(this.cookieName, '/', undefined, false, 'Lax');

    this._router.navigate(['auth/login']);
  }

  isLoggedIn(): boolean {
    return this._cookieService.check(this.cookieName);
  }
}
