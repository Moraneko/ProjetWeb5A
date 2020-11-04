import { Component, OnInit, AfterViewInit, ViewChild, IterableDiffers    } from '@angular/core';
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
  globalFilter = '';
  displayedColumns: string[] = ['nom','prenom','id_user'];
  dataSource = new MatTableDataSource<UserSimple>(this.listeUser);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
  }

  private iterableDiffer; // creation de la variable iterableDiffer pour check la modification de la datasource des cours

  constructor(private adminService : AdminService, private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void {
      // get de la liste total de admins
      this.adminService.getAllAdmin().subscribe(result => {this.listeUser = result});
      this.dataSource = new MatTableDataSource<UserSimple>(this.listeUser);
      this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.listeUser);
    if (changes) {
       this.dataSource.paginator = this.paginator;
    }
  }


  customFilterPredicate() {
         const myFilterPredicate = (data: UserSimple, filter: string): boolean => {
           var globalMatch = false;
           var splitedFilter = filter.split(' ');
           var localMatch = false;
           var localMatchResult = [];
           splitedFilter.forEach(function (str) {
             localMatch = data['id_user'].toString().trim().toLowerCase().indexOf(str.toLowerCase()) !== -1 ||
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
