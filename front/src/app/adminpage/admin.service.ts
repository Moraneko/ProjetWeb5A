import { Injectable } from '@angular/core';
import { UserSimple } from '../model/usersimple';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private getAllUserUrl = '/admin/getAllUser';
  private getAllMoniteurUrl = '/admin/getAllMoniteur';
  private getAllAdminUrl = '/admin/getAllAdmin';
  private userList : UserSimple[] = [{id_user: 10, nom: 'Jean', prenom: 'Dupont', role: 0},
      {id_user: 10, nom: 'Jean2', prenom: 'Dupont2', role: 0},
      {id_user: 10, nom: 'Jean3', prenom: 'Dupont3', role: 0}];

  private moniteurList : UserSimple[] = [{id_user: 10, nom: 'Moniteur Jean', prenom: 'Dupont', role: 1},
      {id_user: 10, nom: 'Moniteur Jean2', prenom: 'Dupont2', role: 1},
      {id_user: 10, nom: 'Moniteur Jean3', prenom: 'Dupont3', role: 1}];

  private adminList : UserSimple[] = [{id_user: 10, nom: 'Admin Jean', prenom: 'Dupont', role: 2},
      {id_user: 10, nom: 'Admin Jean2', prenom: 'Dupont2', role: 2},
      {id_user: 10, nom: 'Admin Jean3', prenom: 'Dupont3', role: 2}];


  constructor(private http: HttpClient) { }

    /*
    getAllUser(): Observable<UserSimple[]>{
        const url = `${this.getAllUserUrl}`;
        return this.http.get<UserSimple[]>(url).pipe(
          tap((liste: UserSimple[]) => console.log(liste))
          );
    */
    getAllUser(): Observable<UserSimple[]> { // a modifier quand back here
      return of(this.userList);
    }


    /*
    getAllMoniteur(): Observable<UserSimple[]>{
        const url = `${this.getAllMoniteurUrl}`;
        return this.http.get<UserSimple[]>(url).pipe(
          tap((liste: UserSimple[]) => console.log(liste))
          );
    */
    getAllMoniteur() : Observable<UserSimple[]> {
      return of(this.moniteurList);
    }

    /*
    getAllAdmin(): Observable<UserSimple[]>{
        const url = `${this.getAllAdminUrl}`;
        return this.http.get<UserSimple[]>(url).pipe(
          tap((liste: UserSimple[]) => console.log(liste))
          );
    */
    getAllAdmin() : Observable<UserSimple[]> {
      return of(this.adminList);
    }

}
