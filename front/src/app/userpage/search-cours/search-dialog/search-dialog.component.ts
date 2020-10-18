import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import { UserSimple } from '../../../model/userSimple';
import { Cours } from '../../../model/cours';
import { CoursService } from './../../cours.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})


export class SearchDialogComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: Cours[] = [];
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
    current_cours: Cours[] = [];
    selectedMoniteur : number;
    selectedNiveau : number;
    displayedColumns: string[] = ['id_cours', 'horaire', 'taille_groupe', 'niveau', 'recurrent', 'moniteur'];
    dataSource = new MatTableDataSource<Cours>(this.ELEMENT_DATA);

     @ViewChild(MatPaginator) paginator: MatPaginator;

     ngAfterViewInit() {
       this.dataSource.paginator = this.paginator;
     }
    constructor(
      private coursService : CoursService,
      public dialogRef: MatDialogRef<SearchDialogComponent>,
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }
      public onSubmit() {

         }
      public moniteurSelect() {
        console.log(this.selectedMoniteur);
      }
      public niveauSelect() {
        console.log(this.selectedNiveau);
      }

      //Event lors de la selection d'un nouveau cours
      public selectCours(event : any) {

        this.coursService.addCours(1,parseInt(event.currentTarget.value));
        /*this.coursService.getCoursUser() // changer l'id ICI
                    .subscribe((data: Cours[]) => this.dataSource = data);*/
        this.majCoursSelected();
        console.log("select cours :"+event.currentTarget.value);
      }

    // MET a jour les liste du composant
      public majCoursSelected () {

        /*
        this.coursService.getAllCours() // changer l'id ICI
            .subscribe((data: Cours[]) => this.dataSource = data);
        */
        this.ELEMENT_DATA = this.coursService.getAllCours(); // Changer ID avec token d'user
        this.dataSource = new MatTableDataSource<Cours>(this.ELEMENT_DATA);

        /*
          this.coursService.getCoursUser(1) // changer l'id ICI
              .subscribe((data: Cours[]) => this.dataSource = data);
          */
        this.current_cours = this.coursService.getCoursUser(1);
       this.dataSource.paginator = this.paginator;
       console.log(this.current_cours);

      }
     // Fnc pour check si le cours est dans la liste des cours suivit par l'user
     public isCoursSelected(id_cours){
      return this.current_cours.some(item =>  item.id_cours === id_cours);
     }

    public ngOnInit(): void {
     //Form control !
      this.searchDialogForm = this._formBuilder.group({
        formTest : ['', [Validators.required ]]
      });

      // initialisation des listes
      this.majCoursSelected();

    }

}
