import { Injectable } from '@angular/core';
import {Cheval} from '../model/cheval';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChevalService {
  private getChevalDispoUrl = 'http://localhost:8080/cheval/dispo';
  private addChevalUrl = 'http://localhost:8080/cheval/add';
  private getAllChevalUrl = 'http://localhost:8080/cheval/all';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private listChevalDispo: Cheval[] = [];

  /*
  getChevalDispo(id_cours): Observable<Cheval[]>{
      const url = `${this.getChevalDispoUrl}`;
      return this.http.get<Cheval[]>(url, {id_cours : id}, this.httpOptions).pipe(
        tap((combi: Cheval[]) => console.log(combi))
        );
  */
  getChevalDispo(id_cours): Observable<Cheval[]> { // a modifier quand back here
    return of(this.listChevalDispo);
  }

  getAllCheval(): Observable<Cheval[]> {
    const url = `${this.getAllChevalUrl}`;
    return this.http.get<Cheval[]>(url).pipe(
     map(data => this.listChevalDispo = data)
    );
  }

  addCheval(cheval: Cheval): Observable<Cheval> {
    return this.http.post<Cheval>(this.addChevalUrl, cheval, this.httpOptions).pipe(
      tap((result: Cheval) => this.listChevalDispo.push(result)));
  }

}
