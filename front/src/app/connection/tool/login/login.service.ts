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
  private loginUrl = '/connectionApi';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  logIn(connectionInfo: ConnectionInfo): Observable<User> {
    return this.http.post<User>(this.loginUrl, connectionInfo, this.httpOptions).pipe(
      tap((connectedUser: User) => console.log(`l'user c'est connecté`)),
      catchError(this.handleError<User>('logIn'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
