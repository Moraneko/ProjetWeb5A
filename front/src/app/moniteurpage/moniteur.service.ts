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
  private coursMoniteur: Cours[] = [];

  private distribution: Combinaison[] = [];

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

      return this.http.get<any[]>(url, {headers: this.httpOptions.headers, params}).pipe(map(data =>
      this.coursMoniteur = data.map(val => {
        const temp = Object.assign({}, val);
        temp.dateDebut = new Date (Date.parse(val.dateDebut) + 60 * 60 * 1000);
        temp.dateFin = new Date (Date.parse(val.dateFin) + 60 * 60 * 1000);
        return temp;
      } )));
  }

  createCours(cours: any): Observable<Cours> {
    return this.http.post<any>(this.addCours, cours, this.httpOptions).pipe(
      tap((result: any) => {
        result.dateDebut = new Date (Date.parse(result.dateDebut) + 60*60*1000);
        result.dateFin = new Date (Date.parse(result.dateFin) + 60*60*1000);
        this.coursMoniteur.push(result);
      }));
  }
  getCombinaisonOfCours(id_cours): Observable<Combinaison[]> { // a modifier quand back here
    const url = `${this.getCombiUrl}`;
    const params = new HttpParams().set('id_cours', id_cours); // Create new HttpParams
    return this.http.get<Combinaison[]>(url, {headers: this.httpOptions.headers, params}).pipe(
      map(data => this.distribution = data));
  }

  attributionCheval(combinaison: Combinaison, cheval: Cheval): Observable<Combinaison[]>  {

    const url = `${this.attrCheval}`;
    return this.http.post<any>(url, {id_cours: combinaison.id_cours,
                                                      combi: combinaison.id_combi,
                                                      cheval: cheval.id_cheval}, this.httpOptions).pipe(
      map(data => this.distribution = data));
  }

}
