import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import {Cheval} from '../../model/cheval';
import { ChevalService } from '../../chevaux/cheval.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-adm-cheval',
  templateUrl: './adm-cheval.component.html',
  styleUrls: ['./adm-cheval.component.css']
})
export class AdmChevalComponent implements OnInit {

  listeChevaux: Cheval[] = [];
  displayedColumns: string[] = ['nom', 'race', 'age', 'couleur', 'sexe', 'taille'];
  dataSource = new MatTableDataSource<Cheval>(this.listeChevaux);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
  }

  constructor(private chevalService : ChevalService) { }

  ngOnInit(): void {
      // get de la liste total de chevaux
      this.chevalService.getAllCheval().subscribe(result => {this.listeChevaux = result});
      this.dataSource = new MatTableDataSource<Cheval>(this.listeChevaux);
  }

}
