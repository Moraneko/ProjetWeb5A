import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
