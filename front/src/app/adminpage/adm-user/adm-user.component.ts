import { Component, OnInit, AfterViewInit, ViewChild   } from '@angular/core';
import {UserSimple} from '../../model/usersimple';
import { AdminService } from '../admin.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-adm-user',
  templateUrl: './adm-user.component.html',
  styleUrls: ['./adm-user.component.css']
})
export class AdmUserComponent implements OnInit {

  listeUser: UserSimple[] = [];
  globalFilter = '';
  displayedColumns: string[] = ['nom','prenom','id_user'];
  dataSource = new MatTableDataSource<UserSimple>(this.listeUser);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
  }

  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
      // get de la liste total de users
      this.adminService.getAllUser().subscribe(result =>this.initTables(result));
  }
  initTables(list: UserSimple[]){
    this.listeUser = list;
    this.dataSource = new MatTableDataSource<UserSimple>(this.listeUser);
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }
  customFilterPredicate() {
         const myFilterPredicate = (data: UserSimple, filter: string): boolean => {
           var globalMatch = false;
           var splitedFilter = filter.split(' ');
           var localMatch = false;
           var localMatchResult = [];
           splitedFilter.forEach(function (str) {
             localMatch = data['idUtilisateur'].toString().trim().toLowerCase().indexOf(str.toLowerCase()) !== -1 ||
                   data['nom'].toString().trim().toLowerCase().indexOf(str.toLowerCase()) !== -1 ||
                   data['prenom'].toString().trim().toLowerCase().indexOf(str.toLowerCase()) !== -1 ||
                   data['role'].toString().trim().toLowerCase().indexOf(str.toLowerCase()) !== -1;
              localMatchResult.push(localMatch);
           });
           let checker = arr => arr.every(v => v === true);

           globalMatch = checker(localMatchResult);

           if (!globalMatch) {
             return;
           }
          return globalMatch;
         }
         return myFilterPredicate;
       }

  applyFilter(filter) {
      this.dataSource.filter = filter;
  }
}
