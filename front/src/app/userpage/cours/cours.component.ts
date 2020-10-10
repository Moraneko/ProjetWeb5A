import { Component, OnInit } from '@angular/core';
import { Cours } from '../../model/cours';

const ELEMENT_DATA: Cours[] = [
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
  {id_cours: 1, horaire: new Date("February 4, 2016 10:13:00"), taille_groupe: 10, niveau: 5 , recurrent: false, moniteur: 5},
];

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  displayedColumns: string[] = ['id_cours', 'horaire', 'taille_groupe', 'niveau', 'recurrent', 'moniteur'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
