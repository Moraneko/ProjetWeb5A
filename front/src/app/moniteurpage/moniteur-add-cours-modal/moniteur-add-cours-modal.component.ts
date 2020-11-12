import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Cours} from '../../model/cours';
import {MoniteurService} from '../moniteur.service';

@Component({
  selector: 'app-moniteur-add-cours-modal',
  templateUrl: './moniteur-add-cours-modal.component.html',
  styleUrls: ['./moniteur-add-cours-modal.component.css']
})
export class MoniteurAddCoursModalComponent implements OnInit {

  newCours: FormGroup;
  niveauList: number[] = [1,2,3,4,5,6,7];
  checkedRecurrent = false;
  constructor(private _formBuilder: FormBuilder, private moniteurService: MoniteurService, public dialogRef: MatDialogRef<MoniteurAddCoursModalComponent>,) { }

  ngOnInit(): void {
      //Form control !
      this.newCours = this._formBuilder.group({
        titre : [''],
        horaire : ['', Validators.required],
        horaire_fin : ['', Validators.required],
        max_cavalier : ['', Validators.required],
        niveau : ['', Validators.required]
    });
  }

  // toggle récupère l'état de la checkbox "récurrent ?"
  toggle(event){
    this.checkedRecurrent = event.checked;
  }

  onSubmit() {
    let debut = new Date(this.newCours.get('horaire').value);
    let fin = new Date(this.newCours.get('horaire_fin').value);
    this.moniteurService.createCours({
      id_cours: 0,
      date_debut: debut.toISOString().slice(0, 19).replace('T', ' '),
      date_fin: fin.toISOString().slice(0, 19).replace('T', ' '),
      max_cavalier: this.newCours.get('max_cavalier').value,
      niveau: this.newCours.get('niveau').value,
      recurrent: this.checkedRecurrent,
      idMoniteur: 0,                                        // Changer l'id du moniteur ici
      titre: this.newCours.get('titre').value,
      etat: 0
      })
    .subscribe(user => {
      console.log('ajout du nouveau cours pour le moniteur');
    });
   this.dialogRef.close();

  }

}
