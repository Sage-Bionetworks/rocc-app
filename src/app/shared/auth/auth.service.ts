import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthService as RoccAuthService,
  LocalAuthRequest,
  LocalAuthResponse,
  User,
  UserService
} from '@sage-bionetworks/rocc-client-angular';
import { pipe } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
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
  constructor(
    private roccAuthService: RoccAuthService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  /**
   * Authenticates user and save token.
   *
   * @param {Object} credentials Login info
   * @return {Observable<User>}
   */
  login(login: string, password: string): Observable<User> {
    const localAuthRequest: LocalAuthRequest = {
      login: login,
      password: password,
    };

    return this.roccAuthService
      .authLocal(localAuthRequest).pipe(
        map((localAuthResponse: LocalAuthResponse) => localAuthResponse.token),
        switchMap(token => {
          this.tokenService.setToken(token);
          return token;
        }),
        switchMap(() => this.userService.getAuthenticatedUser())
      )
      // .pipe(_loginWithTokenResponse(this));

    // return this.httpClient
    //   .post<TokenResponse>('/auth/local', {
    //     email,
    //     password,
    //   })
    //   .pipe(_loginWithTokenResponse(this));
  }

  getTokenService(): TokenService {
    return this.tokenService;
  }

  getUserService(): UserService {
    return this.userService;
  }
}
