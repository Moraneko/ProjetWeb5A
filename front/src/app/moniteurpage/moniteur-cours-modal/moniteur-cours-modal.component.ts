import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MoniteurService } from '../moniteur.service';
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
  constructor(public dialogRef: MatDialogRef<MoniteurCoursModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private moniteurService: MoniteurService) { }

  ngOnInit(): void {
  console.log(this.data.cours.content);
    this.moniteurService.getCombinaisonOfCours(this.data.cours.content.id_cours) // changer l'id ICI
        .subscribe((data: Combinaison[]) => this.distributionUserCheval = data);
    this.moniteurService.getChevalDispo(this.data.cours.content.id_cours) // changer l'id ICI
        .subscribe((data: Cheval[]) => this.listChevalDispo = data);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  chevalForUserSelected(combi, cheval){
    this.moniteurService.attributionCheval(combi,cheval);
    var index = this.listChevalDispo.indexOf(cheval);
    this.listChevalDispo.splice(index,1);

  }

}
