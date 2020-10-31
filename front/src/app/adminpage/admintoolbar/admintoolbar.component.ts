import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"


@Component({
  selector: 'app-admintoolbar',
  templateUrl: './admintoolbar.component.html',
  styleUrls: ['./admintoolbar.component.css']
})
export class AdmintoolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  acceuil() {
     this.router.navigate(['/admin']);
  }

}
