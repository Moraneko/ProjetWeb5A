import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"


@Component({
  selector: 'app-admintoolbar',
  templateUrl: './admintoolbar.component.html',
  styleUrls: ['./admintoolbar.component.css']
})
export class AdmintoolbarComponent implements OnInit {
  public toolbarName: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('user'));
    this.toolbarName = userData.details.nom.concat(' ').concat(userData.details.prenom);
  }
  acceuil() {
     this.router.navigate(['/admin']);
  }
  signOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/connection']);
  }
}
