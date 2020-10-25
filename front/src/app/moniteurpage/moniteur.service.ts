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
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private coursMoniteur: Cours[] = [
    {id_cours: 2, horaire: new Date("October 25, 2020 12:00:00"), taille_groupe: 10, niveau: 2 , recurrent: false, moniteur: 1, titre: ''},
  ];

  getCoursMoniteur(id_moniteur): Observable<Cours[]> {
    return of(this.coursMoniteur);
  }


}
