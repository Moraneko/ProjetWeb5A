import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cours-info-user',
  templateUrl: './cours-info-user.component.html',
  styleUrls: ['./cours-info-user.component.css']
})
export class CoursInfoUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CoursInfoUserComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
