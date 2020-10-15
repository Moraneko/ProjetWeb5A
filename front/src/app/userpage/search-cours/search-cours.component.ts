import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import {SearchDialogComponent} from './search-dialog/search-dialog.component'
@Component({
  selector: 'app-search-cours',
  templateUrl: './search-cours.component.html',
  styleUrls: ['./search-cours.component.css']
})
export class SearchCoursComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

   openDialog(): void {
      const dialogRef = this.dialog.open(SearchDialogComponent, {
        width: '100em',
        data: {id: 10 , name: 'test'}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  ngOnInit(): void {
  }

}
