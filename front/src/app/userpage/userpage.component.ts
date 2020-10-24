import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {UsertoolbarComponent} from './usertoolbar/usertoolbar.component';
import { CoursService } from './cours.service';
import { Cours } from '../model/cours';


@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  dataSource : Cours[] = [];
  constructor(private coursService : CoursService) { }

  public getCoursService () {
    return this.coursService;
  }

  ngOnInit(): void {
  this.coursService.getCoursUser(1) // changer l'id ICI
          .subscribe((data: Cours[]) => this.dataSource = data);

  }

}
