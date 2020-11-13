import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-moniteurtoolbar',
  templateUrl: './moniteurtoolbar.component.html',
  styleUrls: ['./moniteurtoolbar.component.css']
})
export class MoniteurtoolbarComponent implements OnInit {
  public toolbarName: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('user'));
    this.toolbarName = userData.details.nom.concat(' ').concat(userData.details.prenom);
  }
  acceuil() {
     this.router.navigate(['/moniteur']);
  }
  signOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/connection']);
  }


}
