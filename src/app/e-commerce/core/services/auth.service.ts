import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { LoggedUser } from '../../data/models/login.model';
import { RespData } from '../../data/models/responseData.model';
import { User } from '../../data/models/userData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<LoggedUser>(null);

  signUp(userData: User) {
    return this.http
      .post(`${baseUrl}user-auth/login`, {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
      })
      .pipe(
        catchError(this.handleError),
        tap((respData) => {})
      );
  }

  signIn(userData: { email: string; password: string }) {
    return this.http
      .post<RespData>(`${baseUrl}user-auth/login`, {
        email: userData['email'],
        password: userData['password'],
      })
      .pipe(
        catchError(this.handleError),
        tap((respData) => {          
          this.handleAuth(
            respData['result'].user.email,
            respData['result'].user.email,
            respData['result'].token
          );
        })
      );
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new LoggedUser(
      userData.email,
      userData.id,
      userData._token,
    );    
    this.user.next(loadedUser);
  }

  private handleAuth(email: string, userId: string, token: string) {
    const user = new LoggedUser(email, userId, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errResponse.error || !errResponse.error.data) {
      return throwError(errorMessage);
    }

    if (errResponse.error.message) {
      errorMessage = errResponse.error.message;
    }

    for (const [key, val] of Object.entries(errResponse.error.data)) {
      switch (key) {
        case 'first_name':
          errorMessage = val[0];
          break;
        case 'last_name':
          errorMessage = val[0];
          break;
        case 'email':
          errorMessage = val[0];
          break;
        case 'password':
          errorMessage = val[0];
          break;
      }
    }

    return throwError(errorMessage);
  }
}
