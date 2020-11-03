import { Component, OnInit, AfterViewInit, ViewChild   } from '@angular/core';
import {UserSimple} from '../../model/usersimple';
import { AdminService } from '../admin.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-adm-admin',
  templateUrl: './adm-admin.component.html',
  styleUrls: ['./adm-admin.component.css']
})
export class AdmAdminComponent implements OnInit {

 listeUser: UserSimple[] = [];
  displayedColumns: string[] = ['nom','prenom'];
  dataSource = new MatTableDataSource<UserSimple>(this.listeUser);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
  }

  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
      // get de la liste total de chevaux
      this.adminService.getAllAdmin().subscribe(result => {this.listeUser = result});
      this.dataSource = new MatTableDataSource<UserSimple>(this.listeUser);
  }
}
