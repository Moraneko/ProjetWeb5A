import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Cours } from '../model/cours';
import {UserSimple} from '../model/userSimple';
import {Cheval} from "../model/cheval";
@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }

  private getCours = 'http://localhost:8080/cours/getUser';
  private getAllCoursStr =  'http://localhost:8080/cours/getAllCours';

  private getAllMoniteurUrl = 'http://localhost:8080/admin/getAllMoniteur';
  private addCoursUrl = 'http://localhost:8080/cours/addCoursToUser';
  private getChevalByCoursAndUserUrl = 'http://localhost:8080/cours/detailCours';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private userCours: Cours[] = [];

  private moniteurList: UserSimple[] = [];


  private allCours: Cours[] = [];
  getCoursUser(id_user): Observable<Cours[]>{

    const url = `${this.getCours}`;
    const params = new HttpParams().set('id_user', id_user); // Create new HttpParams
    return this.http.get<any[]>(url, {headers: this.httpOptions.headers, params}).pipe(map(data =>
      this.userCours = data.map(val => {
        const temp = Object.assign({}, val);
        temp.dateDebut = new Date (Date.parse(val.dateDebut) + 60 * 60 * 1000);
        temp.dateFin = new Date (Date.parse(val.dateFin) + 60 * 60 * 1000);
        return temp;
      } )));

  }
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

    addCours(id_user, id_cours){
      // tslint:disable-next-line:max-line-length
      const params = new HttpParams().set('idCours', id_cours).set('iduser', id_user); // Create new HttpParams
      return this.http.get<Cours>(this.addCoursUrl,  {headers: this.httpOptions.headers, params}).pipe(tap((data: any) => {
         data.dateDebut = new Date (Date.parse(data.dateDebut) + 60 * 60 * 1000);
         data.dateFin = new Date (Date.parse(data.dateFin) + 60 * 60 * 1000);
         this.userCours.push(data);
     }
        ));

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

  getChevalByCours(id_cours: any, userID: any): Observable<any> {
    const url = `${this.getChevalByCoursAndUserUrl}`;
    const params = new HttpParams().set('id_cours', id_cours).set('id_user', userID); // Create new HttpParams
    return this.http.get<any>(url, {headers: this.httpOptions.headers, params});
  }
}
