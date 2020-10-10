import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {UsertoolbarComponent} from './usertoolbar/usertoolbar.component';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
