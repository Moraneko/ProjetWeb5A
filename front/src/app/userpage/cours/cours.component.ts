import { Component, OnInit, Input, ViewChild, IterableDiffers  } from '@angular/core';
import { Cours } from '../../model/cours';
import { CoursService } from './../cours.service';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  displayedColumns: string[] = ['id_cours', 'horaire', 'taille_groupe', 'niveau', 'recurrent', 'moniteur'];
  @Input() dataSource: Cours[];
  @ViewChild(MatTable) table: MatTable<Element>;

  iterableDiffer; // creation de la variable iterableDiffer pour check la modification de la datasource des cours
  viewFinishedInit = false;

  constructor(private coursService : CoursService, private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  public showTable (){
    console.log(this.table);
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewFinishedInit = true;
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.dataSource);
    if (changes && this.viewFinishedInit) {
       this.table.renderRows();
    }
  }

}
