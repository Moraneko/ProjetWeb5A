import { Injectable } from '@angular/core';
import {Cheval} from '../model/cheval';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {User} from "../model/user";

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
  private listChevalTot: Cheval[] = [];

  getChevalDispo(id_cours): Observable<Cheval[]> { // a modifier quand back here
    const url = `${this.getChevalDispoUrl}`;
    const params = new HttpParams().set('id_cours', id_cours); // Create new HttpParams

    return this.http.get<Cheval[]>(url, {headers: this.httpOptions.headers, params}).pipe(map(data => this.listChevalDispo = data));
  }

  getAllCheval(): Observable<Cheval[]> {
    const url = `${this.getAllChevalUrl}`;
    return this.http.get<Cheval[]>(url).pipe(
     map(data => this.listChevalTot = data)
    );
  }

  addCheval(cheval: Cheval): Observable<Cheval> {
    return this.http.post<Cheval>(this.addChevalUrl, cheval, this.httpOptions).pipe(
      tap((result: Cheval) => this.listChevalDispo.push(result)));
  }

}
