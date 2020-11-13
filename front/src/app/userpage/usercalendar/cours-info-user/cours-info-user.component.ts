import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { CoursService } from './../../cours.service';

@Component({
  selector: 'app-cours-info-user',
  templateUrl: './cours-info-user.component.html',
  styleUrls: ['./cours-info-user.component.css']
})
export class CoursInfoUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CoursInfoUserComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private coursService : CoursService) { }
  chevalCours = 'Aucun';
  etat = 'Programmé';
  ngOnInit(): void {
    if(this.data.cours.content.etat === 1){
      this.etat = 'Annulé';
    }
    let userData = JSON.parse(localStorage.getItem('user'));
    let userID = userData.details.id;
    this.coursService.getChevalByCours(this.data.cours.content.idCours, userID).subscribe(data => {
      if(data.nom !== null){
        this.chevalCours = data.nom;
      }
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
