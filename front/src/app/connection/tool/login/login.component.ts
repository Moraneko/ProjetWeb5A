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
      hide = true;

  loginForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private loginService : LoginService) { }

  onSubmit() {
       this.loginService.logIn({
                    identifiant:  this.loginForm.get('identifiantLogin').value,
                    mdp:  this.loginForm.get('mdp').value,
                    } as ConnectionInfo)
                .subscribe(user => {
                  console.log('connection de l\'user');
                });

     }

  ngOnInit(): void {

   //Form control !

      this.loginForm = this._formBuilder.group({
        identifiantLogin : ['', [Validators.required ]],
        mdp : ['', Validators.required]
      });

  }

}
