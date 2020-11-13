import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {Router} from '@angular/router';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  constructor(private router: Router) { }



  ngOnInit(): void {
    let temp = JSON.parse(localStorage.getItem('user'));
    if(temp != null){
      switch (temp.details.role){
        case 0: {
          this.router.navigate(['/user']);
          break;
        }
        case 1: {
          this.router.navigate(['/moniteur']);
          break;
        }
        case 2: {
          this.router.navigate(['/admin']);
          break;
        }
        case 3: {
          this.router.navigate(['/admin']);
          break;
        }
      }
    }
  }

}
