import { Injectable } from '@angular/core';
import { UserSimple } from '../model/UserSimple';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from './../model/user';

import {Cours} from "../model/cours";

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }

  private getAllUserUrl = 'http://localhost:8080/admin/getAllUser';
  private getAllMoniteurUrl = 'http://localhost:8080/admin/getAllMoniteur';
  private getAllAdminUrl = 'http://localhost:8080/admin/getAllAdmin';
  private addNewMoniteurUrl = 'http://localhost:8080/admin/newMoniteur';
  private addNewAdminUrl = 'http://localhost:8080/admin/addAdmin';
  private modifAdminInfoUrl = 'http://localhost:8080/admin/changeUserInfo';
  private getUserUrl = 'http://localhost:8080/admin/getUserbyId';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private userList: UserSimple[] = [];

  private moniteurList: UserSimple[] = [];

  private adminList: UserSimple[] = [];

   private userInfo: User ;

    getAllUser(): Observable<UserSimple[]> {
      const url = `${this.getAllUserUrl}`;
      return this.http.get<UserSimple[]>(url).pipe(
        map(data => this.userList = data));
    }


    getAllMoniteur(): Observable<UserSimple[]>{
        const url = `${this.getAllMoniteurUrl}`;
        return this.http.get<UserSimple[]>(url).pipe(
          map(data => this.moniteurList = data)
          );
    }

    getAllAdmin(): Observable<UserSimple[]>{
        const url = `${this.getAllAdminUrl}`;
        return this.http.get<UserSimple[]>(url).pipe(
          map(data => this.adminList = data)
          );
     }

  newMoniteur(user: User): Observable<User> {

      return this.http.post<any>(this.addNewMoniteurUrl, user, this.httpOptions).pipe(
      tap((newUser) => this.moniteurList.push({idUtilisateur : newUser.id, nom : newUser.nom, prenom: newUser.prenom, role: newUser.role}))
    );
  }

  newAdmin(user: User): Observable<User> {
      return this.http.post<any>(this.addNewAdminUrl, user, this.httpOptions).pipe(
      tap((newUser) => this.adminList.push({idUtilisateur : newUser.id, nom : newUser.nom, prenom: newUser.prenom, role: newUser.role}))
    );
  }

  changeInfo(user: any): Observable<User> {
    return this.http.put<User>(this.modifAdminInfoUrl, user, this.httpOptions);
  }
   getUserById(id_user): Observable<User> {
     const params = new HttpParams().set('id_user', id_user); // Create new HttpParams
     return this.http.get<User>(this.getUserUrl, {headers: this.httpOptions.headers, params}).pipe(map(data => this.userInfo = data));
   }
}
