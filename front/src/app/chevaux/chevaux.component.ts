import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import {Router} from "@angular/router"
import {Cheval} from '../model/cheval';
import { ChevalService } from './cheval.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-chevaux',
  templateUrl: './chevaux.component.html',
  styleUrls: ['./chevaux.component.css']
})
export class ChevauxComponent implements OnInit {
  addCheval: FormGroup;
  chevalInfo: Cheval;
  listeChevaux: Cheval[] = [];
  displayedColumns: string[] = ['nom', 'race', 'age', 'couleur', 'sexe', 'taille'];
  dataSource = new MatTableDataSource<Cheval>(this.listeChevaux);

   @ViewChild(MatPaginator) paginator: MatPaginator;

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }
  constructor(private _formBuilder: FormBuilder, private chevalService : ChevalService, private router: Router) { }

  ngOnInit(): void {
    // get de la liste total de chevaux
    this.chevalService.getAllCheval().subscribe(result => {this.listeChevaux = result});
    this.dataSource = new MatTableDataSource<Cheval>(this.listeChevaux);

    //Form control !

      this.addCheval = this._formBuilder.group({
        nom : ['', Validators.required],
        couleur : ['', Validators.required],
        race : ['', Validators.required],
        sexe : ['', Validators.required],
        age : ['', Validators.required],
        taille : ['', Validators.required]
      });
  }
  onSubmit() {

    this.chevalService.addCheval({ id_cheval: -1,
      nom:  this.addCheval.get('nom').value,
      couleur:  this.addCheval.get('couleur').value,
      race:  this.addCheval.get('race').value,
      sexe:  this.addCheval.get('sexe').value,
      age:  this.addCheval.get('age').value,
      taille:  this.addCheval.get('taille').value} as Cheval)
    .subscribe(cheval => {
      console.log('Ajout du cheval dans la BDD');
       this.dataSource.paginator = this.paginator;
     });
  }

  retourPageUser() {
  }

}
