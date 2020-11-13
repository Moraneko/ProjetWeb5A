import { Component, OnInit, Input, IterableDiffers, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Cours } from '../../model/cours';

@Component({
  selector: 'app-coursmoniteur',
  templateUrl: './coursmoniteur.component.html',
  styleUrls: ['./coursmoniteur.component.css']
})
export class CoursmoniteurComponent implements OnInit {
  displayedColumns: string[] = ['id_cours', 'horaire', 'max_cavalier', 'niveau'];
  @Input() dataSource: Cours[];
  @ViewChild(MatTable) table: MatTable<Element>;

  private iterableDiffer; // creation de la variable iterableDiffer pour check la modification de la datasource des cours
  private viewFinishedInit = false;
  public dataSourceFiltred : Cours[];

  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewFinishedInit = true;
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.dataSource);
    if (changes && this.viewFinishedInit) {
      this.dataSourceFiltred = this.dataSource.filter(x => x.etat ===0);
      this.table.renderRows();
    }
  }

}
