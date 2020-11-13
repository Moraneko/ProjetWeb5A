import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MoniteurService } from '../moniteur.service';
import { ChevalService } from '../../chevaux/cheval.service';
import { Combinaison } from '../../model/combinaison';
import { Cheval } from '../../model/cheval';

@Component({
  selector: 'app-moniteur-cours-modal',
  templateUrl: './moniteur-cours-modal.component.html',
  styleUrls: ['./moniteur-cours-modal.component.css']
})
export class MoniteurCoursModalComponent implements OnInit {

  distributionUserCheval: Combinaison[];
  listChevalDispo: Cheval[];
  nombreChevauxTotal = 0;
  constructor(public dialogRef: MatDialogRef<MoniteurCoursModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private moniteurService: MoniteurService, private chevalService : ChevalService) { }

  ngOnInit(): void {
    this.moniteurService.getCombinaisonOfCours(this.data.cours.content.id_cours) // changer l'id ICI
        .subscribe((data: Combinaison[]) => this.distributionUserCheval = data);
    this.chevalService.getChevalDispo(this.data.cours.content.id_cours) // changer l'id ICI
        .subscribe((data: Cheval[]) => {
          this.listChevalDispo = data;
          console.log(this.listChevalDispo);
        });
    this.chevalService.getAllCheval()
        .subscribe((data: Cheval[]) => this.nombreChevauxTotal = data.length);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  chevalForUserSelected(combi, cheval){
    console.log(cheval);
    this.moniteurService.attributionCheval(combi,cheval).subscribe((data: Combinaison[]) => this.distributionUserCheval = data);

  }

  annulerCours() {
    const id = this.data.cours.content.id_cours;
    this.moniteurService.annuleCours(id)
      .subscribe(data => this.moniteurService.getCoursMoniteur(id).subscribe());
    this.dialogRef.close();
  }
}
