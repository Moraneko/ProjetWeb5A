import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {LoginService} from './login.service';

import { User } from '../../../model/user';
import { ConnectionInfo } from '../../../model/connectionInfo';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";

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
  loginForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private loginService : LoginService) { }

  onSubmit() {
       this.loginService.logIn({
                    email:  this.loginForm.get('emailLogin').value,
                    mdp:  this.loginForm.get('mdp').value,
                    } as ConnectionInfo)
                .subscribe(user => {
                  console.log('connection de l\'user');
                });

     }

  ngOnInit(): void {

   //Form control !

      this.loginForm = this._formBuilder.group({
        emailLogin : ['', [Validators.required, Validators.email]],
        mdp : ['', Validators.required]
      });

  }

}
