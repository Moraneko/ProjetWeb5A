import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   email = new FormControl('', [Validators.required, Validators.email]);
   hide = true;

      getErrorMessage() {
        if (this.email.hasError('required')) {
          return 'Entrez une adresse';
        }

        return this.email.hasError('email') ? 'Adresse invalide' : '';
      }

  constructor() { }

  ngOnInit(): void {
  }

}
