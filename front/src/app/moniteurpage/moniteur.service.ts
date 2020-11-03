import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private getCoursUrl = '/cours/getMoniteur';
  private addCours = '/cours/newCours';
  private getCombiUrl = '/cours/combiOfCours';
  private attrCheval = '/cheval/attr';
  private getUserUrl = '/moniteur/getUser';
  private modifUserUrl = '/moniteur/modifUser';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //Composant de test Temporaires.
  private coursMoniteur: Cours[] = [
    {id_cours: 2, horaire: new Date("October 25, 2020 12:00:00"), taille_groupe: 10, niveau: 2 , recurrent: false, moniteur: 1, titre: 'Cours test'},
  ];

  private distribution : Combinaison[] = [{
    id_combi:1,
    id_cours:2,
    user: {id_user: 10, nom: 'Jean', prenom: 'Dupont', role: 0},
    cheval: { id_cheval: 1, nom: 'El Condor Pasa', age: -1, sexe: '', couleur: '', taille: -1, race: ''}
    },{
    id_combi:2,
    id_cours:2,
    user: {id_user: 11, nom: 'Jean2', prenom: 'Dupont2', role: 0},
    cheval: { id_cheval: -1, nom: '', age: -1, sexe: '', couleur: '', taille: -1, race: ''}
    },{
    id_combi:3,
    id_cours:2,
    user: {id_user: 12, nom: 'Jean3', prenom: 'Dupont3', role: 0},
    cheval: { id_cheval: -1, nom: '', age: -1, sexe: '', couleur: '', taille: -1, race: ''}
    }];


  /*getUserById(id_user): Observable<User>{
    const url = `${this.getUserUrl}/${id_user}`;
    return this.http.get<User>(url);

  }*/

  private userInfo : User = {
    id_user: 10,
    nom: 'Tarby',
    prenom: 'Arnaud',
    email: 'adresse@email.fr',
    telephone: '0102030405',
    mdp: 'azerty',
    licence: '',
    role: 1,
  }
  getUserById(id_user): Observable<User> {
    return of(this.userInfo);
  }

 changeInfo(user: User): Observable<User> {
   return this.http.post<User>(this.modifUserUrl, user, this.httpOptions);
 }


  /*
  getCoursMoniteur(id_moniteur): Observable<Cours[]>{
      const url = `${this.getCoursUrl}/${id_moniteur}`;
      return this.http.get<Cours[]>(url).pipe(
        tap((cours: Cours[]) => console.log(cours ))
        );
  */
  getCoursMoniteur(id_moniteur): Observable<Cours[]> {  // a modifier quand back here
    return of(this.coursMoniteur);
  }


  createCours(cours: Cours): Observable<Cours> {
    this.coursMoniteur.push(cours); // A SUPRRIMER ET REMPLACER LA REPONSE POUR AJOUTER EN LOCAL
    console.log("Liste des cours du moniteur:");
    console.log(this.coursMoniteur);
    return this.http.post<Cours>(this.addCours, cours, this.httpOptions).pipe(
      tap((result: Cours) => console.log(result)));
  }

  /*
  getCombinaisonOfCours(id_cours): Observable<Combinaison[]>{
      const url = `${this.getCombiUrl}/${id_cours}`;
      return this.http.get<Combinaison[]>(url).pipe(
        tap((combi: Combinaison[]) => console.log(combi))
        );
  */
  getCombinaisonOfCours(id_cours): Observable<Combinaison[]> { // a modifier quand back here
    return of(this.distribution);
  }

  /*
  attributionCheval(combinaison: Combinaison, cheval: Cheval) : Observable<Combinaison[]>{
      const url = `${this.attrCheval}/${combinaison.id_cours}`;
      return this.http.post<Combinaison[]>(url).pipe(
        tap((combi: Combinaison[]) => console.log(combi))
        );
  */
  attributionCheval(combinaison: Combinaison, cheval: Cheval) : Observable<Combinaison[]>  {
    console.log(this.distribution.indexOf(combinaison));
    var index = this.distribution.indexOf(combinaison);
    this.distribution[index].cheval = cheval;
    return of(this.distribution);
  }

}
