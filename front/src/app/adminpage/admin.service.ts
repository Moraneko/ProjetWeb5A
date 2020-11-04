import { Injectable } from '@angular/core';
import { UserSimple } from '../model/usersimple';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from './../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private getAllUserUrl = 'http:/localhost:8080/admin/getAllUser';
  private getAllMoniteurUrl = 'http:/localhost:8080/admin/getAllMoniteur';
  private getAllAdminUrl = 'http:/localhost:8080/admin/getAllAdmin';
  private addNewMoniteurUrl = 'http:/localhost:8080/admin/newMoniteur';
  private addNewAdminUrl = 'http:/localhost:8080/admin/addAdmin';
  private modifUserUrl = 'http:/localhost:8080/admin/changeUserInfo';
  private getUserUrl = 'http:/localhost:8080/admin/getUserById';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
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

  newMoniteur(user: User): Observable<User> {
      this.moniteurList.push({id_user: user.id_user, nom: user.nom, prenom: user.prenom, role: user.role}); // A SUPRRIMER ET REMPLACER LA REPONSE POUR AJOUTER EN LOCAL
      console.log("Liste des moniteur:");
      console.log(this.moniteurList);
    return this.http.post<User>(this.addNewMoniteurUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(newUser))
    );
  }

  newAdmin(user: User): Observable<User> {
      this.adminList.push({id_user: user.id_user, nom: user.nom, prenom: user.prenom, role: user.role}); // A SUPRRIMER ET REMPLACER LA REPONSE POUR AJOUTER EN LOCAL
      console.log("Liste des moniteur:");
      console.log(this.adminList);
    return this.http.post<User>(this.addNewAdminUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(newUser))
    );
  }

  changeUserInfo(user: User): Observable<User> {
    return this.http.post<User>(this.modifUserUrl, user, this.httpOptions);
  }
   /*getUserById(id_user): Observable<User>{
     const url = `${this.getUserUrl}`;
     return this.http.get<User>(url, {id_user : id_user}, this.httpOptions);

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
}
