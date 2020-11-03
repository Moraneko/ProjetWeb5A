import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RecupMdp } from '../../../model/recupMdp';
import { BasicCallBackResponse } from '../../../model/basicCallbackReponse';

@Injectable({
  providedIn: 'root'
})
export class RecupMdpService {

  constructor(private http: HttpClient) { }
  private recupUrl = '/recupMdp';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  recup(recupMdp: RecupMdp): Observable<BasicCallBackResponse> {
      return this.http.post<BasicCallBackResponse>(this.recupUrl, recupMdp, this.httpOptions).pipe(
        tap((response: BasicCallBackResponse) => console.log(`la demande de nouveau mdp a été faite`)),
        catchError(this.handleError<BasicCallBackResponse>('erreur recup mdp'))
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
