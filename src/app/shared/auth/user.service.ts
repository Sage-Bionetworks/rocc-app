import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  // get(): Observable<User> {
  //   return this.httpClient.get<User>(`/api/users/${userId}`);
  // }
}
