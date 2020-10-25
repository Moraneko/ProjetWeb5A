import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Cours } from '../model/cours';

@Injectable({
  providedIn: 'root'
})
export class MoniteurService {

  constructor(private http: HttpClient) { }
  private getCoursUrl = '/cours/getMoniteur';
  private addCours = '/cours/newCours';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private coursMoniteur: Cours[] = [
    {id_cours: 2, horaire: new Date("October 25, 2020 12:00:00"), taille_groupe: 10, niveau: 2 , recurrent: false, moniteur: 1, titre: ''},
  ];


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


}
