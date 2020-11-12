import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import {Router, ActivatedRoute } from "@angular/router"
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-change-info-user',
  templateUrl: './change-info-user.component.html',
  styleUrls: ['./change-info-user.component.css']
})
export class voirInfoUserComponent implements OnInit {

  constructor( private adminService : AdminService, private router: Router, private actRoute: ActivatedRoute) {
    this.userId = this.actRoute.snapshot.params.id;
  }

  userInfo : User;
  userId: number;


  ngOnInit(): void {

  // Get data from service
  this.adminService.getUserById(this.userId) // changer l'id ICI
            .subscribe((data: User) => this.userInfo = data);


  }


   retourPageUser() {

    this.router.navigate(['/admin']);

   }
}
