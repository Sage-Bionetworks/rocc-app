import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AuthService as RoccAuthService,
  LocalAuthRequest,
  LocalAuthResponse,
  User,
  UserService,
} from '@sage-bionetworks/rocc-client-angular';
import { pipe } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';

// const _loginWithTokenResponse = (authService: AuthService) =>
//   pipe(
//     map((localAuthResponse: LocalAuthResponse) => localAuthResponse.token),
//     switchMap(token => {
//       authService.getTokenService().setToken(token);
//       return authService.getUserService().getAuthenticatedUser()
//     })

//     // map((user) => {
//     //   authService.setAuthInfo(new AuthInfo(user));
//     //   return user;
//     // }),
//     // catchError((err) => {
//     //   authService.logout();
//     //   return throwError(err);
//     // })
//   );

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);

  // private loginUrl = '/login';
  private redirectUrl = '/';

  constructor(
    private roccAuthService: RoccAuthService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  login(login: string, password: string): Observable<User> {
    const localAuthRequest: LocalAuthRequest = {
      login: login,
      password: password,
    };

    return this.roccAuthService.authLocal(localAuthRequest).pipe(
      map((localAuthResponse: LocalAuthResponse) => localAuthResponse.token),
      switchMap((token) => {
        this.tokenService.setToken(token);
        return token;
      }),
      switchMap(() => this.userService.getAuthenticatedUser()),
      tap(user => this.user.next(user))
    );
  }

  isSignedIn(): Observable<boolean> {
    return this.user.pipe(
      map(user => user !== undefined)
    );
  }

  getUser(): Observable<User | undefined> {
    return this.user.asObservable();
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  setRedirectUrl(redirectUrl: string): void {
    this.redirectUrl = redirectUrl;
  }
}
