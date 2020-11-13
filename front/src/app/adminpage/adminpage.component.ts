import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {MatDialog} from '@angular/material/dialog';
import {NewMoniteurComponent} from './adm-moniteur/new-moniteur/new-moniteur.component';
import {NewAdminComponent} from './adm-admin/new-admin/new-admin.component';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addCheval() {
    this.router.navigate(['/gestionChevaux']);
  }

  openDialogAddMoniteur(): void {
    const dialogRef = this.dialog.open(NewMoniteurComponent, {
      width: '100em',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogAddAdmin(): void {
    const dialogRef = this.dialog.open(NewAdminComponent, {
      width: '100em',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
