import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../../../model/user';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  error409 = false;

  constructor(private http: HttpClient) { }
  private signupUrl = 'http://localhost:8080/formulaire';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.signupUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.error409 = false),
      catchError(this.handleError<User>('signUp'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error.status); // log to console instead
        if(error.status === 409) {
          this.error409 = true;
        }
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

  getErrorMsg(): Observable<boolean> {
    return of(this.error409);
  }
}
