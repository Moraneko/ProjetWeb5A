import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Cours } from '../model/cours';
import {UserSimple} from "../model/userSimple";
@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }

  private getCours = 'http://localhost:8080/cours/getUser';
  private getAllCoursStr =  'http://localhost:8080/cours/getAllCours';
  private getAllMoniteurUrl = 'http://localhost:8080/admin/getAllMoniteur';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private userCours: Cours[] = [
    {id_cours: 2, date_debut: new Date("November 11, 2020 12:00:00"), date_fin: new Date("November 11, 2020 13:00:00"), max_cavalier: 10, niveau: 2 , recurrent: false, moniteur: 1, titre: ''},
  ];

  private moniteurList: UserSimple[] = [];

  private allCours: Cours[] = [];
  /*getCoursUser(id_user): Observable<Cours[]>{
    const url = `${this.getCours}/${id_user}`;
    return this.http.get<Cours[]>(url, {id_user : id_user}, this.httpOptions).pipe(
      tap((cours: Cours[]) => console.log(cours )),
      catchError(this.handleError<Cours[]>('getCours'))
      );

  }
  */
  getAllCours(): Observable<Cours[]>{
    const url = `${this.getAllCoursStr}`;
    return this.http.get<Cours[]>(url).pipe(
      map(data => this.allCours = data)
    );
  }
  getAllMoniteur(): Observable<UserSimple[]>{
    const url = `${this.getAllMoniteurUrl}`;
    return this.http.get<UserSimple[]>(url).pipe(
      map(data => this.moniteurList = data)
    );
  }

// FNC TEMPORAIRE
    getCoursUser(id_user): Observable<Cours[]> {
      return of(this.userCours);
    }

    addCours(id_user,id_cours){
      this.userCours.push(this.allCours[id_cours-1]);
      console.log("Liste des cours de l'user:");
      console.log(this.userCours);
        this.http.post("http://localhost:8080/cours/addCoursToUser", {idCours: id_cours, iduser: id_user} ,this.httpOptions).subscribe();
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
