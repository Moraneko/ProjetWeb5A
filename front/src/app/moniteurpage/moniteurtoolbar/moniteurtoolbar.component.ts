import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-moniteurtoolbar',
  templateUrl: './moniteurtoolbar.component.html',
  styleUrls: ['./moniteurtoolbar.component.css']
})
export class MoniteurtoolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  acceuil() {
     this.router.navigate(['/moniteur']);
  }


}
