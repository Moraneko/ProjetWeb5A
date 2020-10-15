import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import { UserSimple } from '../../../model/userSimple';
import { Cours } from '../../../model/cours';

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
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})


export class SearchDialogComponent implements OnInit, AfterViewInit {

  searchDialogForm: FormGroup;
    moniteurList: UserSimple[] = [
      {  id_user: 1,
         nom: 'nomMoniteur1',
         prenom: 'prenomMoniteur1',
         role: 1},
      {  id_user: 2,
               nom: 'nomMoniteur2',
               prenom: 'prenomMoniteur2',
               role: 1},
      {  id_user: 3,
               nom: 'nomMoniteur3',
               prenom: 'prenomMoniteur3',
               role: 1}
    ];
    niveauList: number[] = [1,2,3,4,5,6,7,8,9];
    selectedMoniteur : number;
    selectedNiveau : number;
    displayedColumns: string[] = ['id_cours', 'horaire', 'taille_groupe', 'niveau', 'recurrent', 'moniteur'];
    dataSource = new MatTableDataSource<Cours>(ELEMENT_DATA);

     @ViewChild(MatPaginator) paginator: MatPaginator;

     ngAfterViewInit() {
       this.dataSource.paginator = this.paginator;
     }
    constructor(
      public dialogRef: MatDialogRef<SearchDialogComponent>,
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
      onSubmit() {

         }
      moniteurSelect() {
        console.log(this.selectedMoniteur);
      }
      niveauSelect() {
        console.log(this.selectedNiveau);
      }

    ngOnInit(): void {

     //Form control !

        this.searchDialogForm = this._formBuilder.group({
          formTest : ['', [Validators.required ]]
        });

    }

}
