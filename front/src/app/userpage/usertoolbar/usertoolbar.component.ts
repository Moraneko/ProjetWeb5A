import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usertoolbar',
  templateUrl: './usertoolbar.component.html',
  styleUrls: ['./usertoolbar.component.css']
})
export class UsertoolbarComponent implements OnInit {
  public toolbarName: any;


  constructor(private router: Router) { }

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('user'));
    this.toolbarName = userData.details.nom.concat(' ').concat(userData.details.prenom);
  }

  signOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/connection']);
  }
}
