import { Component, OnInit } from '@angular/core';
import { Cours } from '../../model/cours';
import { CoursService } from './../cours.service';


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  displayedColumns: string[] = ['id_cours', 'horaire', 'taille_groupe', 'niveau', 'recurrent', 'moniteur'];
  dataSource : Cours[] = [];
  constructor(private coursService : CoursService) { }

  getCoursFromService () {

    /*
    this.coursService.getCoursUser(1) // changer l'id ICI
        .subscribe((data: Cours[]) => this.dataSource = data);
    */
     this.dataSource = this.coursService.getCoursUser(1);

  }

  public majCoursUser(){
    this.getCoursFromService();
  }
  ngOnInit(): void {
    this.majCoursUser();
  }

}
