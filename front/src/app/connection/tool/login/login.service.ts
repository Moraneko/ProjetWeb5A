import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../../../model/user';
import { ConnectionInfo } from '../../../model/connectionInfo';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private loginUrl = 'http://localhost:8080/connectionApi';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  logIn(connectionInfo: ConnectionInfo): Observable<any> {
    return this.http.post<User>(this.loginUrl, connectionInfo, this.httpOptions).pipe(
      tap((connectedUser: any) => {
        this.error404 = false;
        localStorage.setItem('user', JSON.stringify(connectedUser));
      }),
      catchError(this.handleError<User>('logIn'))
    );
  }

  error404 = false;

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        this.error404 = true;
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

  getErrorMsg(): Observable<boolean> {
    return of(this.error404);
  }
}
