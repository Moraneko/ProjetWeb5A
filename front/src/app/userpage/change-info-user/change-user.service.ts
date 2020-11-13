import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
  private getUserUrl = 'http://localhost:8080/user/getUser';
  private modifUserUrl = 'http://localhost:8080/user/modifUser';
  private userInfo : User ;

  getUserById(id_user): Observable<User> {

    const params = new HttpParams().set('id_user', id_user); // Create new HttpParams
    return this.http.get<User>(this.getUserUrl, {headers: this.httpOptions.headers, params}).pipe(map(data => this.userInfo = data));
  }

 changeInfo(user: any): Observable<User> {
   return this.http.put<User>(this.modifUserUrl, user, this.httpOptions);
 }
}
