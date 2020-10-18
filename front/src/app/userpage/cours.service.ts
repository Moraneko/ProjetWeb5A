import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Cours } from '../model/cours';
@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }

  private loginUrl = '/connectionApi';  // URL to web api
  private getCours = '/cours/getUser';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private userCours: Cours[] = [
    {id_cours: 2, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  ];

  private allCours: Cours[] = [
    {id_cours: 1, horaire: new Date("February 1, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
    {id_cours: 2, horaire: new Date("February 2, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
    {id_cours: 3, horaire: new Date("February 3, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
    {id_cours: 4, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
    {id_cours: 5, horaire: new Date("February 5, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
    {id_cours: 6, horaire: new Date("February 6, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
    {id_cours: 7, horaire: new Date("February 7, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
    {id_cours: 8, horaire: new Date("February 8, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
    {id_cours: 9, horaire: new Date("February 9, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
    {id_cours: 10, horaire: new Date("February 10, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  ]
  /*getCoursUser(id_user): Observable<Cours[]>{
    const url = `${this.getCours}/${id_user}`;
    return this.http.get<Cours[]>(url).pipe(
      tap((cours: Cours[]) => console.log(cours )),
      catchError(this.handleError<Cours[]>('getCours'))
      );

  }
  getAllCours(): Observable<Cours[]>{
    const url = `${this.getCours}/all`;
    return this.http.get<Cours[]>(url).pipe(
      tap((cours: Cours[]) => console.log(cours )),
      catchError(this.handleError<Cours[]>('getCours'))
    );
  }
  */


// FNC TEMPORAIRE
    getCoursUser(id_user): Cours[] {
      return this.userCours;
    }

    getAllCours(): Cours[] {
      return this.allCours;
    }

    addCours(id_user,id_cours){
      this.userCours.push(this.allCours[id_cours-1]);
      console.log("ajout du cours "+id_cours+" au répertoire de l'user -- a faire en backend");
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
