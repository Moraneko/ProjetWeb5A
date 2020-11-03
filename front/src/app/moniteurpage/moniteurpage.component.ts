import { Component, OnInit } from '@angular/core';
import {MoniteurService} from './moniteur.service';
import { Cours } from '../model/cours';
import {MatDialog} from '@angular/material/dialog';
import {MoniteurAddCoursModalComponent} from './moniteur-add-cours-modal/moniteur-add-cours-modal.component';

@Component({
  selector: 'app-moniteurpage',
  templateUrl: './moniteurpage.component.html',
  styleUrls: ['./moniteurpage.component.css']
})
export class MoniteurpageComponent implements OnInit {

  dataSource : Cours[] = [];
  constructor(private moniteurService : MoniteurService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.moniteurService.getCoursMoniteur(1) // changer l'id ICI
        .subscribe((data: Cours[]) => this.dataSource = data);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MoniteurAddCoursModalComponent, {
      width: '100em',
      data: {id_moniteur: 1} // Changer id moniteur ici
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
