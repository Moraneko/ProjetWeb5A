import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Cours } from '../model/cours';
import {Combinaison} from '../model/combinaison';
import {Cheval} from '../model/cheval';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class MoniteurService {

  constructor(private http: HttpClient) { }
  private getCoursUrl = 'http://localhost:8080/cours/getMoniteur';
  private addCours = 'http://localhost:8080/cours/newCours';
  private getCombiUrl = 'http://localhost:8080/cours/combiOfCours';
  private attrCheval = 'http://localhost:8080/cheval/attr';
  private getUserUrl = 'http://localhost:8080/moniteur/getUser';
  private modifUserUrl = 'http://localhost:8080/moniteur/modifUser';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Composant de test Temporaires.
  private coursMoniteur: Cours[] = [
    {id_cours: 2, date_debut: new Date('November 11, 2020 12:00:00'), date_fin: new Date('November 11, 2020 13:00:00'), max_cavalier: 10, niveau: 2 , recurrent: false, moniteur: 1, titre: 'Cours test'},
  ];

  private distribution: Combinaison[] = [{
    id_combi: 1,
    id_cours: 2,
    user: {idUtilisateur: 10, nom: 'Jean', prenom: 'Dupont', role: 0},
    cheval: { id_cheval: 1, nom: 'El Condor Pasa', age: -1, sexe: '', couleur: '', taille: -1, race: ''}
    }, {
    id_combi: 2,
    id_cours: 2,
    user: {idUtilisateur: 11, nom: 'Jean2', prenom: 'Dupont2', role: 0},
    cheval: { id_cheval: -1, nom: '', age: -1, sexe: '', couleur: '', taille: -1, race: ''}
    }, {
    id_combi: 3,
    id_cours: 2,
    user: {idUtilisateur: 12, nom: 'Jean3', prenom: 'Dupont3', role: 0},
    cheval: { id_cheval: -1, nom: '', age: -1, sexe: '', couleur: '', taille: -1, race: ''}
    }];

  private userInfo: User ;

  getUserById(id_user): Observable<User> {

    const params = new HttpParams().set('id_user', id_user); // Create new HttpParams
    return this.http.get<User>(this.getUserUrl, {headers: this.httpOptions.headers, params}).pipe(map(data => this.userInfo = data));
  }

 changeInfo(user: any): Observable<User> {
   return this.http.put<User>(this.modifUserUrl, user, this.httpOptions);
 }

  getCoursMoniteur(id_moniteur): Observable<Cours[]>{
      const url = `${this.getCoursUrl}`;
      const params = new HttpParams().set('id_moniteur', id_moniteur); // Create new HttpParams
      return this.http.get<Cours[]>(url, {headers: this.httpOptions.headers, params}).pipe(map(data =>
        this.coursMoniteur = data));
  }

  createCours(cours: any): Observable<Cours> {
    return this.http.post<Cours>(this.addCours, cours, this.httpOptions).pipe(
      tap((result: Cours) => this.coursMoniteur.push(result)));
  }

  /*
  getCombinaisonOfCours(id_cours): Observable<Combinaison[]>{
      const url = `${this.getCombiUrl}`;
      return this.http.get<Combinaison[]>(url, {id_cours : id_cours}, this.httpOptions).pipe(
        tap((combi: Combinaison[]) => console.log(combi))
        );
  */
  getCombinaisonOfCours(id_cours): Observable<Combinaison[]> { // a modifier quand back here
    return of(this.distribution);
  }

  /*
  attributionCheval(combinaison: Combinaison, cheval: Cheval) : Observable<Combinaison[]>{
      const url = `${this.attrCheval}/${combinaison.id_cours}`;
      return this.http.post<Combinaison[]>(url, {id_cours : combinaison.id_cours, combi : combinaison.id_combi , cheval : cheval.id_cheval }, this.httpOptions).pipe(
        tap((combi: Combinaison[]) => console.log(combi))
        );
  */
  attributionCheval(combinaison: Combinaison, cheval: Cheval): Observable<Combinaison[]>  {
    console.log(this.distribution.indexOf(combinaison));
    const index = this.distribution.indexOf(combinaison);
    this.distribution[index].cheval = cheval;
    return of(this.distribution);
  }

}
