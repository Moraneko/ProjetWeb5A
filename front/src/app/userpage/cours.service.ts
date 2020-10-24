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
    {id_cours: 2, horaire: new Date("October 24, 2020 12:00:00"), taille_groupe: 10, niveau: 2 , recurrent: false, moniteur: 1, titre: ''},
  ];

  private allCours: Cours[] = [
    {id_cours: 1, horaire: new Date("October 24, 2020 10:00:00"), taille_groupe: 10, niveau: 1 , recurrent: false, moniteur: 1, titre: ''},
    {id_cours: 2, horaire: new Date("October 24, 2020 12:00:00"), taille_groupe: 10, niveau: 2 , recurrent: false, moniteur: 1, titre: ''},
    {id_cours: 3, horaire: new Date("October 24, 2020 14:00:00"), taille_groupe: 10, niveau: 3 , recurrent: false, moniteur: 1, titre: ''},
    {id_cours: 4, horaire: new Date("October 25, 2020 10:00:00"), taille_groupe: 10, niveau: 4 , recurrent: false, moniteur: 2, titre: ''},
    {id_cours: 5, horaire: new Date("October 25, 2020 12:00:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 2, titre: ''},
    {id_cours: 6, horaire: new Date("October 25, 2020 14:00:00"), taille_groupe: 10, niveau: 1 , recurrent: false, moniteur: 2, titre: ''},
    {id_cours: 7, horaire: new Date("October 23, 2020 10:00:00"), taille_groupe: 10, niveau: 2 , recurrent: false, moniteur: 3, titre: ''},
    {id_cours: 8, horaire: new Date("October 23, 2020 12:00:00"), taille_groupe: 10, niveau: 3 , recurrent: false, moniteur: 3, titre: ''},
    {id_cours: 9, horaire: new Date("October 23, 2020 14:00:00"), taille_groupe: 10, niveau: 4 , recurrent: false, moniteur: 3, titre: ''},
    {id_cours: 10, horaire: new Date("October 23, 2020 16:00:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 3, titre: ''},
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
    getCoursUser(id_user): Observable<Cours[]> {
      return of(this.userCours);
    }

    getAllCours(): Observable<Cours[]>  {
      return of(this.allCours);
    }

    addCours(id_user,id_cours){
      this.userCours.push(this.allCours[id_cours-1]);
      console.log("Liste des cours de l'user:");
      console.log(this.userCours);
      this.http.put("/cours/addCoursToUser", {idCours: id_cours, iduser: id_user} ,this.httpOptions).subscribe();
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
