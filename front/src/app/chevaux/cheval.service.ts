import { Injectable } from '@angular/core';
import {Cheval} from '../model/cheval';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChevalService {
  private getChevalDispoUrl = '/cheval/dispo';
  private addChevalUrl = '/cheval/add';
  private getAllChevalUrl = '/cheval/all';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private listChevalDispo: Cheval[]= [
    { id_cheval: 2, nom: 'Special Week', age: -1, sexe: '', couleur: '', taille: -1, race: ''},
    { id_cheval: 3, nom: 'Golden Boat', age: -1, sexe: '', couleur: '', taille: -1, race: ''}
    ];

  /*
  getChevalDispo(id_cours): Observable<Cheval[]>{
      const url = `${this.getChevalDispoUrl}/${id_cours}`;
      return this.http.get<Cheval[]>(url).pipe(
        tap((combi: Cheval[]) => console.log(combi))
        );
  */
  getChevalDispo(id_cours): Observable<Cheval[]> { // a modifier quand back here
    return of(this.listChevalDispo);
  }

  /*
  getAllCheval(): Observable<Cheval[]>{
      const url = `${this.getAllChevalUrl}`;
      return this.http.get<Cheval[]>(url).pipe(
        tap((liste: Cheval[]) => console.log(liste))
        );
  */
  getAllCheval(): Observable<Cheval[]> { // a modifier quand back here
    return of(this.listChevalDispo);
  }

  addCheval(cheval: Cheval): Observable<Cheval> {
    this.listChevalDispo.push(cheval); // A SUPRRIMER ET REMPLACER LA REPONSE POUR AJOUTER EN LOCAL
    console.log("Liste des chevaux :");
    console.log(this.listChevalDispo);
    return this.http.post<Cheval>(this.addChevalUrl, cheval, this.httpOptions).pipe(
      tap((result: Cheval) => console.log(result)));
  }

}
