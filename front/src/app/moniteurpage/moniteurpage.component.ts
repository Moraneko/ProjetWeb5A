import { Component, OnInit } from '@angular/core';
import {MoniteurService} from './moniteur.service';
import { Cours } from '../model/cours';
import {MatDialog} from '@angular/material/dialog';
import {MoniteurAddCoursModalComponent} from './moniteur-add-cours-modal/moniteur-add-cours-modal.component';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-moniteurpage',
  templateUrl: './moniteurpage.component.html',
  styleUrls: ['./moniteurpage.component.css']
})
export class MoniteurpageComponent implements OnInit {

  dataSource : Cours[] = [];

  constructor(private moniteurService : MoniteurService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('user'));
    let userID = userData.details.id;
    this.moniteurService.getCoursMoniteur(userID)// changer l'id ICI
        .subscribe((data: Cours[]) => this.dataSource = data);

  }

  openDialog(): void {
    let userData = JSON.parse(localStorage.getItem('user'));
    let userID = userData.details.id;
    const dialogRef = this.dialog.open(MoniteurAddCoursModalComponent, {
      width: '100em',
      data: {id_moniteur: userID} // Changer id moniteur ici
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
