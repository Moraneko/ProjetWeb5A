import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class ChangeUserService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private getUserUrl = '/user/getUser';
  private modifUserUrl = '/user/modifUser';
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
    /*getUserById(id_user): Observable<User>{
      const url = `${this.getUserUrl}/${id_user}`;
      return this.http.get<User>(url);

    }*/

  getUserById(id_user): Observable<User> {
    return of(this.userInfo);
  }

 changeInfo(user: User): Observable<User> {
   return this.http.post<User>(this.modifUserUrl, user, this.httpOptions);
 }
}
