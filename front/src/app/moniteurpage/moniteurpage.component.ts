import { Component, OnInit } from '@angular/core';
import {MoniteurService} from './moniteur.service';
import { Cours } from '../model/cours';

@Component({
  selector: 'app-moniteurpage',
  templateUrl: './moniteurpage.component.html',
  styleUrls: ['./moniteurpage.component.css']
})
export class MoniteurpageComponent implements OnInit {

  dataSource : Cours[] = [];
  constructor(private moniteurService : MoniteurService) { }

  ngOnInit(): void {

    this.moniteurService.getCoursMoniteur(1) // changer l'id ICI
        .subscribe((data: Cours[]) => this.dataSource = data);

  }

  openDialog() {
  }

}
